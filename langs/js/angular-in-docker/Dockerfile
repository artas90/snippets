### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Run to build
# docker build -t test-app-todo .

# Run to run
# docker run --name test-app-todo -rm -p 8888:80 test-app-todo

# Run to export
# docker save test-app-todo:latest > test-app-todo.tar
