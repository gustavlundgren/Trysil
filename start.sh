#!/bin/sh
set -e

# Apply Prisma schema to the database (creates tables if missing)
# Database URL is provided via environment variable in docker-compose
echo "Verifying permissions for /app/database..."
ls -ld /app/database
touch /app/database/test_perm && rm /app/database/test_perm || echo "WARNING: No write permission in /app/database"

node ./node_modules/prisma/build/index.js db push --schema /app/prisma/schema.prisma

# Start the Next.js standalone server
exec node server.js
