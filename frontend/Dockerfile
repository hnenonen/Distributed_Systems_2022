FROM node:16-alpine AS build

WORKDIR /usr/app

COPY . .

RUN npm ci --production && \
    npm run build

FROM nginx:1.21.4-alpine

COPY --from=build /usr/app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
