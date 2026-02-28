# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Next.js telemetry is disabled
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Run Prisma migrations and create the database folder for SQLite volume
RUN mkdir -p /app/prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# We also need the prisma client in the standalone bundle. Next.js standalone usually handles this, 
# but it requires the Prisma engines. It's safer to copy node_modules/@prisma/client and .prisma
# Or just copy the whole schema and let it be generated. Actually, Vercel standalone traces Prisma.
# We will create a robust startup script to ensure DB schemas are pushed on start.

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Note: For SQLite persistence in Docker, mount a volume to the path where your dev.db is.
# e.g., DATABASE_URL="file:/app/data/prod.db" and mount /app/data

CMD ["./start.sh"]
