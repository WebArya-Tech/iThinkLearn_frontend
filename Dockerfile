# ─────────────────────────────────────────
# Stage 1 – Build the React app
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Set NODE_ENV to production during build
ENV NODE_ENV=production

ARG VITE_API_BASE_URL
ARG VITE_ADMIN_USERNAME
ARG VITE_ADMIN_PASSWORD
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ADMIN_USERNAME=$VITE_ADMIN_USERNAME
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD

# Install dependencies (layer-cache friendly)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ─────────────────────────────────────────
# Stage 2 – Production image with static server
# ─────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]
