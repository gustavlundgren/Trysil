#!/bin/sh
set -e

# Apply Prisma schema to the database (creates tables if missing)
node ./node_modules/prisma/build/index.js db push

# Start the Next.js standalone server
exec node server.js
