FROM node:14.16.0-alpine3.10 AS build

WORKDIR /app/frontend

COPY package.json .
COPY yarn.lock .

RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/frontend/build /app/frontend

COPY nginx.conf /etc/nginx/nginx.conf

