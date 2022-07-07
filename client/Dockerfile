FROM nginx:1.20.0-alpine

WORKDIR /app

RUN sed -i 's/\/usr\/share\/nginx\/html/\/app/g' /etc/nginx/conf.d/default.conf

COPY build/ .
