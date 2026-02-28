#!/bin/sh
set -e

# Fix permissions on the database volume (since Docker mounts can be owned by root)
echo "Ensuring /app/database is owned by nextjs..."
chown -R nextjs:nodejs /app/database

# Apply Prisma schema to the database (creates tables if missing)
echo "Running database migrations..."
su-exec nextjs node ./node_modules/prisma/build/index.js db push --schema /app/prisma/schema.prisma

# Start the Next.js standalone server as the unprivileged user
echo "Starting Next.js server..."
exec su-exec nextjs node server.js
