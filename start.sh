#!/bin/sh
set -e

# Apply Prisma schema to the database (creates tables if missing)
./node_modules/.bin/prisma db push

# Start the Next.js standalone server
exec node server.js
