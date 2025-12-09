FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY package-lock.json* ./

RUN npm ci

COPY . .

RUN npx ng build --configuration=production


FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ozon/browser/. /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]