FROM node:12

WORKDIR /app

RUN mkdir -p /var/log/crowdecrypt

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "index"]
