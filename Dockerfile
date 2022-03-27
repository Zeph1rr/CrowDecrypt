FROM node:12

WORKDIR /app

RUN mkdir -p /var/log/crowdecrypt

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN cd client && npm ci --production

EXPOSE 3000

CMD ["npm", "start"]
