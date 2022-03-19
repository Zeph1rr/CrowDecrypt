FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["npm", "start", ">", "/var/log/crowdecrypt-$(date -I).log"]