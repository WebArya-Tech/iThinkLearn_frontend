# ─────────────────────────────────────────
# Stage 1 – Build the React app with Node
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source and build
COPY . .
RUN npm run build

# ─────────────────────────────────────────
# Stage 2 – Serve with Nginx
# ─────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Replace the default Nginx config with our custom one
COPY ngnix.conf /etc/nginx/conf.d/default.conf

# Copy Vite build output into Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
