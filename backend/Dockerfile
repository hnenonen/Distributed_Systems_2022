FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci --production

EXPOSE 3001

CMD ["npm", "start"]