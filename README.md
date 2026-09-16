# The Wedding Cars — Full-Stack JavaScript Application

Premium wedding car rental website (Bogor, Jabodetabek & Bandung) with a blog CMS.

## Tech Stack

- **Frontend**: React 19 (JavaScript), Tailwind CSS, framer-motion, Lenis — `/app/frontend`
- **Backend**: Node.js 20 + Express — `/app/backend`
- **Database**: MySQL / MariaDB
- **Storage**: Emergent object storage (blog image uploads)

## Project Structure

```
/app
├── frontend/               # React app (Create React App + craco)
│   ├── public/             # index.html, robots.txt, sitemap.xml, images/
│   └── src/
│       ├── components/     # Header, Footer, Sections, Marquee, Conversion, SEO
│       ├── pages/          # Home, Fleet, FleetDetail, RealWeddings, Packages,
│       │                   # LocationPage, About, FaqPage, Blog, BlogPost, Contact
│       ├── pages/admin/    # AdminLogin, AdminBlog, AdminEdit (blog CMS)
│       ├── data/           # site.js (fleet, locations, FAQs), blog.js (fallback data)
│       └── lib/            # api.js (axios client), analytics.js (dataLayer events)
├── backend/
│   ├── server.js           # Express entry point (port 8001)
│   ├── src/
│   │   ├── env.js          # dotenv loader (imported first everywhere)
│   │   ├── db.js           # MySQL pool + schema init
│   │   ├── auth.js         # bcrypt hashing, JWT, auth middleware, login lockout
│   │   ├── storage.js      # Emergent object storage client
│   │   ├── seed.js         # admin seeding + blog seed (first run only)
│   │   └── routes/         # authRoutes, blogRoutes, fileRoutes
│   ├── scripts/migrate-from-mongo.js  # one-time legacy data migration
│   ├── blog_seed.json      # 10 original articles (seeded if blog_posts is empty)
│   └── .env.example
└── README.md
```

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | JWT signing secret (64-char hex) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials (idempotent) |
| `MYSQL_HOST/PORT/USER/PASSWORD/DATABASE` | MySQL connection |
| `EMERGENT_LLM_KEY` | Object storage auth (image uploads) |
| `INTEGRATION_PROXY_URL` | Storage proxy (injected by platform) |
| `CORS_ORIGINS` | Allowed origins |
| `MONGO_URL` / `DB_NAME` | Legacy — only for the one-time migration script |

Frontend env: `frontend/.env` → `REACT_APP_BACKEND_URL` (public origin; `/api` is routed to the backend).

## Database Setup

```sql
CREATE DATABASE theweddingcars CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'twc'@'localhost' IDENTIFIED BY '<db-password>';
GRANT ALL PRIVILEGES ON theweddingcars.* TO 'twc'@'localhost';
```

Tables are created automatically on backend startup (`src/db.js`):
- **users** (id, email UNIQUE, password_hash, name, role, created_at)
- **blog_posts** (id, slug UNIQUE, title, excerpt, image, alt, date, meta_description, published, sections JSON, timestamps; index on published+date)
- **login_attempts** (identifier PK, count, locked_until) — 5 failures → 15 min lockout
- **files** (id, storage_path UNIQUE, content_type, is_deleted soft-delete, uploaded_by)

On first run the backend seeds the admin user and the 10 blog articles from `blog_seed.json`.

## Local Development

```bash
# Backend (http://localhost:8001)
cd backend && cp .env.example .env   # fill values
yarn install                          # or npm install
yarn dev                              # node --watch

# Frontend (http://localhost:3000)
cd frontend && yarn install && yarn start
```

## API Overview

Public:
- `GET /api/blog` — published posts
- `GET /api/blog/:slug` — single post
- `GET /api/files/<path>` — uploaded images (public, cacheable)

Auth:
- `POST /api/auth/login` `{email, password}` → `{token, user}`
- `GET /api/auth/me` (Bearer token)

Admin (Bearer token required):
- `GET/POST /api/admin/blog`, `PUT/DELETE /api/admin/blog/:id`
- `POST /api/admin/upload` (multipart `file`, jpg/png/webp ≤ 8MB)

The admin panel lives at `/admin/login` in the React app.

## Deployment

- Backend listens on `0.0.0.0:8001`; all API routes are prefixed `/api`.
- This environment runs both services via supervisor: `mysql` (mariadb), `backend` (node server.js), `frontend` (yarn start).
- Restart: `sudo supervisorctl restart backend` / `mysql` / `frontend`.
- No Python and no MongoDB are required to run the application.

## Maintenance Notes

- Blog content is served from MySQL; `src/data/blog.js` is only a fallback if the API is unreachable.
- Uploaded images are stored in Emergent object storage; MySQL `files` table is the source of truth (soft-delete only — storage has no delete API).
- Admin password changes: update `ADMIN_PASSWORD` in `backend/.env` and restart the backend — the seed syncs the hash.
- `scripts/migrate-from-mongo.js` is a one-time legacy migration tool; it requires the `mongodb` devDependency and is safe to delete afterwards.
