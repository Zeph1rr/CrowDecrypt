FROM node:16

WORKDIR /app

RUN mkdir -p /var/log/crowdecrypt

COPY server/package*.json ./

RUN npm ci --production

COPY server/ .

COPY client/build/ ./build/

EXPOSE 3000

CMD ["npm", "start"]
