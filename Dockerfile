# Rebuild the source code only when needed
FROM node:16-alpine AS builder
LABEL product="wikifolio-web"

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY src/theme ./src/theme
RUN npm install --progress=false --no-fund --legacy-peer-deps
RUN npm install -save-dev @next/swc-linux-x64-musl --legacy-peer-deps

COPY . .
RUN npm run test
RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
LABEL product="wikifolio-web"

# upgrade to remove potential vulnerability
RUN apk upgrade --no-cache musl

WORKDIR /app
ENV NODE_ENV production
ENV DD_AGENT_HOST dd-agent
ENV DD_TRACE_AGENT_PORT 8126

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/.setup-logging ./.setup-logging
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start-prod"]
