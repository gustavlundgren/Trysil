#!/bin/sh
set -e

# Ensure the database directory exists (important for volume mounts)
mkdir -p /app/database

# Apply Prisma schema to the database (creates tables if missing)
# Database URL is provided via environment variable in docker-compose
node ./node_modules/prisma/build/index.js db push --schema /app/prisma/schema.prisma

# Start the Next.js standalone server
exec node server.js
