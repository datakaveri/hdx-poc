FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# prod-vm (docker-compose.prod.yml) layers the environment.prod.ts fileReplacement
# on top of production; the default keeps localhost URLs for the local dev compose.
ARG BUILD_CONFIGURATION=production
RUN npx nx build HDX --configuration=$BUILD_CONFIGURATION

FROM nginx:alpine
COPY --from=build /app/dist/apps/HDX/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
