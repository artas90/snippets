FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build

# -- -- -- --

FROM nginx:1.19.4-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=build /app/dist/ngui/ /usr/share/nginx/html

STOPSIGNAL SIGTERM

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
