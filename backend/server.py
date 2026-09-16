from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, UploadFile, File, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
import os
import re
import json
import uuid
import logging
import bcrypt
import jwt
import requests
from datetime import datetime, timezone, timedelta

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
APP_NAME = "theweddingcars"

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
storage_key = None

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "type": "access",
               "exp": datetime.now(timezone.utc) + timedelta(hours=24)}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = None
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"email": payload["email"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


async def check_lockout(identifier: str):
    rec = await db.login_attempts.find_one({"identifier": identifier})
    if rec and rec.get("count", 0) >= 5:
        locked_until = rec.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Terlalu banyak percobaan login. Coba lagi dalam 15 menit.")


async def record_failed_login(identifier: str):
    rec = await db.login_attempts.find_one({"identifier": identifier})
    count = (rec.get("count", 0) + 1) if rec else 1
    update = {"count": count, "last_attempt": datetime.now(timezone.utc).isoformat()}
    if count >= 5:
        update["locked_until"] = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
    await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)


# ---------- Object storage ----------

def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(f"{STORAGE_URL}/objects/{path}",
                        headers={"X-Storage-Key": key, "Content-Type": content_type},
                        data=data, timeout=120)
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.put(f"{STORAGE_URL}/objects/{path}",
                            headers={"X-Storage-Key": key, "Content-Type": content_type},
                            data=data, timeout=120)
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


# ---------- Models ----------

class LoginInput(BaseModel):
    email: str
    password: str


class BlogSection(BaseModel):
    heading: Optional[str] = None
    paragraphs: List[str] = []


class BlogPostInput(BaseModel):
    title: str
    slug: str
    excerpt: str = ""
    image: str = ""
    alt: str = ""
    date: str = ""
    metaDescription: str = ""
    published: bool = True
    sections: List[BlogSection] = []


def serialize_post(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    return re.sub(r"[\s-]+", "-", text).strip("-")


# ---------- Auth routes ----------

@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request):
    email = input.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    await check_lockout(identifier)
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await record_failed_login(identifier)
        raise HTTPException(status_code=401, detail="Email atau password salah.")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(str(user["_id"]), email)
    return {"token": token, "user": {"email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api_router.get("/auth/me")
async def me(request: Request):
    return await get_current_user(request)


# ---------- Public blog routes ----------

@api_router.get("/blog")
async def list_posts():
    posts = await db.blog_posts.find({"published": True}, {"_id": 0}).sort("date", -1).to_list(200)
    return posts


@api_router.get("/blog/{slug}")
async def get_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# ---------- Admin blog routes ----------

@api_router.get("/admin/blog")
async def admin_list_posts(request: Request):
    await get_current_user(request)
    return await db.blog_posts.find({}, {"_id": 0}).sort("date", -1).to_list(500)


@api_router.post("/admin/blog")
async def create_post(input: BlogPostInput, request: Request):
    await get_current_user(request)
    slug = slugify(input.slug or input.title)
    existing = await db.blog_posts.find_one({"slug": slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug sudah digunakan. Gunakan judul/slug lain.")
    now = datetime.now(timezone.utc).isoformat()
    doc = input.model_dump()
    doc.update({"id": str(uuid.uuid4()), "slug": slug,
                "date": input.date or now[:10], "created_at": now, "updated_at": now})
    await db.blog_posts.insert_one(doc)
    return serialize_post(doc)


@api_router.put("/admin/blog/{post_id}")
async def update_post(post_id: str, input: BlogPostInput, request: Request):
    await get_current_user(request)
    doc = input.model_dump()
    doc["slug"] = slugify(input.slug or input.title)
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return await db.blog_posts.find_one({"id": post_id}, {"_id": 0})


@api_router.delete("/admin/blog/{post_id}")
async def delete_post(post_id: str, request: Request):
    await get_current_user(request)
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"deleted": True}


@api_router.post("/admin/upload")
async def upload_image(request: Request, file: UploadFile = File(...)):
    user = await get_current_user(request)
    ext = file.filename.split(".")[-1].lower() if "." in file.filename else "jpg"
    if ext not in ("jpg", "jpeg", "png", "webp"):
        raise HTTPException(status_code=400, detail="Hanya file gambar (jpg/png/webp) yang diizinkan.")
    path = f"{APP_NAME}/blog/{uuid.uuid4()}.{ext}"
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Ukuran file maksimal 8MB.")
    content_type = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}[ext]
    result = put_object(path, data, content_type)
    await db.files.insert_one({
        "id": str(uuid.uuid4()), "storage_path": result["path"],
        "original_filename": file.filename, "content_type": content_type,
        "size": result["size"], "is_deleted": False,
        "uploaded_by": user["email"], "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"path": result["path"], "url": f"/api/files/{result['path']}"}


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    data, content_type = get_object(path)
    return Response(content=data, media_type=record.get("content_type", content_type))


@api_router.get("/")
async def root():
    return {"message": "The Wedding Cars API"}


# ---------- Startup ----------

async def seed_admin():
    email = os.environ.get("ADMIN_EMAIL")
    password = os.environ.get("ADMIN_PASSWORD")
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "email": email, "password_hash": hash_password(password),
            "name": "Admin", "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded: %s", email)
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})
        logger.info("Admin password updated from env")


async def seed_blog():
    count = await db.blog_posts.count_documents({})
    if count > 0:
        return
    seed_file = ROOT_DIR / "blog_seed.json"
    if not seed_file.exists():
        return
    posts = json.loads(seed_file.read_text())
    now = datetime.now(timezone.utc).isoformat()
    for p in posts:
        p.update({"id": str(uuid.uuid4()), "published": True,
                  "metaDescription": p.get("excerpt", ""), "created_at": now, "updated_at": now})
    await db.blog_posts.insert_many(posts)
    logger.info("Seeded %d blog posts", len(posts))


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.blog_posts.create_index("slug", unique=True)
    await seed_admin()
    await seed_blog()
    try:
        init_storage()
        logger.info("Object storage initialized")
    except Exception as e:
        logger.error("Storage init failed: %s", e)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
