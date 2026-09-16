# Auth Testing Playbook — The Wedding Cars Admin

## Credentials (see /app/memory/test_credentials.md)
- Admin: admin@theweddingcars.id / WeddingCars2026!

## Step 1: MongoDB
- db.users.find({role:"admin"}) — password_hash starts with $2b$
- Indexes: users.email (unique), blog_posts.slug (unique), login_attempts.identifier

## Step 2: API
```
TOKEN=$(curl -s -X POST $API/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"admin@theweddingcars.id","password":"WeddingCars2026!"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
curl -s $API/api/auth/me -H "Authorization: Bearer $TOKEN"
curl -s $API/api/blog | python3 -c "import sys,json;print(len(json.load(sys.stdin)))"
curl -s $API/api/admin/blog -H "Authorization: Bearer $TOKEN"
```
Login returns {token, user}. /me returns the admin user. /api/blog returns 10 seeded posts.

## Step 3: Lockout
5 failed logins on same email → 429 for 15 minutes.
