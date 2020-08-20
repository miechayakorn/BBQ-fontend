# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./hcare/package*.json ./
RUN npm install
COPY ./hcare/ .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]