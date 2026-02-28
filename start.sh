#!/bin/sh
set -e

echo "--- Debugging Filesystem ---"
echo "Working directory: $(pwd)"
ls -la
echo "Checking prisma directory:"
ls -la ./prisma || echo "prisma directory not found!"
echo "--- Starting Prisma Sync ---"

# Apply Prisma schema to the database (creates tables if missing)
node ./node_modules/prisma/build/index.js db push --schema /app/prisma/schema.prisma

# Start the Next.js standalone server
exec node server.js
