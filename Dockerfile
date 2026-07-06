FROM node:20 as build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Use Nginx to serve the built static files
FROM nginx:alpine

# Copy custom nginx config if you have one, or just copy the build files
COPY --from=build /app/dist /usr/share/nginx/html

# Fallback routing for React Router SPA
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

ENV PORT=8080
EXPOSE $PORT

CMD sed -i -e 's/8080/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
