# Stage 1: Build the Angular application
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install -f

COPY . .

RUN npm run build --configuration=production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/QatraApplication /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

EXPOSE 80

