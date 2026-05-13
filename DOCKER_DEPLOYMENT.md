# Docker Deployment Guide

## Overview
This setup uses a multi-stage Docker build for optimal production deployment. The application is built with Node.js and served using the `serve` package on port 3000.

## Prerequisites
- Docker and Docker Compose installed
- Environment variables configured in `.env` file

## Environment Setup

Copy `.env.example` to `.env` and configure your production environment:

```bash
cp .env.example .env
```

Required variables:
- `VITE_API_BASE_URL` - Your backend API endpoint
- `VITE_ADMIN_USERNAME` - Admin username (use secrets in production)
- `VITE_ADMIN_PASSWORD` - Admin password (use secrets in production)
- `NODE_ENV` - Should be set to `production`

## Building the Docker Image

### Development Build
```bash
docker build -t ithinklearn-frontend:dev .
```

### Production Build
```bash
docker build --target production -t ithinklearn-frontend:latest .
```

## Running with Docker Compose

### Start the container
```bash
docker-compose up -d
```

### Stop the container
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f frontend
```

### Rebuild and restart
```bash
docker-compose up -d --build
```

## Port Mapping
- **Local Port:** 3000
- **Container Port:** 3000
- **External Access:** http://localhost:3000

## Integration with External Nginx

If you have nginx configured externally, configure it as a reverse proxy:

```nginx
upstream frontend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Health Check
The container includes a health check that:
- Starts after 40 seconds
- Checks every 30 seconds
- Fails after 3 consecutive failures
- Times out after 10 seconds

View health status:
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
```

## Performance Optimization

The multi-stage build:
1. **Builder Stage:** Compiles the React app to static files in `dist/`
2. **Production Stage:** Uses only the built artifacts (smaller image)
3. **Serves:** Uses lightweight `serve` package for SPA routing

Image size: ~150MB (Node 20-alpine + serve)

## Deployment on Server

### Docker Run
```bash
docker run -d \
  --name ithinklearn-frontend \
  -p 3000:3000 \
  -e VITE_API_BASE_URL=https://api.example.com \
  -e NODE_ENV=production \
  --restart unless-stopped \
  ithinklearn-frontend:latest
```

### With Docker Compose (Recommended)
```bash
docker-compose -f docker-compose.yml up -d
```

## Environment Variables for Production

Set these via Docker:
```yaml
environment:
  - NODE_ENV=production
  - VITE_API_BASE_URL=${VITE_API_BASE_URL}
  - VITE_ADMIN_USERNAME=${VITE_ADMIN_USERNAME}
  - VITE_ADMIN_PASSWORD=${VITE_ADMIN_PASSWORD}
```

Or use Docker secrets for sensitive data:
```bash
echo "your_api_url" | docker secret create api_url -
```

## Troubleshooting

### Container exits immediately
```bash
docker-compose logs frontend
```

### Check health status
```bash
docker inspect --format='{{.State.Health.Status}}' ithinklearn-frontend
```

### Verify port binding
```bash
docker port ithinklearn-frontend
```

### Rebuild without cache
```bash
docker build --no-cache -t ithinklearn-frontend:latest .
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
