# Auth Testing Playbook — The Wedding Cars Admin

## Credentials (see /app/memory/test_credentials.md)
- Admin: admin@theweddingcars.id / WeddingCars2026!

## Step 1: MySQL
```
mysql -e "USE theweddingcars; SELECT email, role FROM users; SHOW INDEX FROM blog_posts;"
```
Verify: users row exists with bcrypt hash ($2b$...), unique index on blog_posts.slug.

## Step 2: API
```
TOKEN=$(curl -s -X POST $API/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"admin@theweddingcars.id","password":"WeddingCars2026!"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
curl -s $API/api/auth/me -H "Authorization: Bearer $TOKEN"
curl -s $API/api/blog
```
Login returns {token, user}. /me returns the admin user. /api/blog returns published posts.

## Step 3: Lockout
5 failed logins on same email → 429 for 15 minutes.
