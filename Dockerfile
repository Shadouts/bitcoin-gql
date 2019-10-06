FROM node:10-alpine

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/server.js" ]
