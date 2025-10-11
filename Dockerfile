# Dockerfile (multi-stage) — Next.js standalone output
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# copy Next standalone output (if you use output:'standalone')
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
ENV PORT=3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- --timeout=2 http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]