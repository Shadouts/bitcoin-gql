FROM node:16-alpine AS node-builder
WORKDIR /usr/local/app
COPY  .npmrc package.json package-lock.json /usr/local/app/
RUN npm install
COPY webpack.config.js tsconfig.json /usr/local/app/
COPY src /usr/local/app/src
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/local/app
COPY --from=node-builder /usr/local/app/dist /usr/local/app/dist
COPY --from=node-builder /usr/local/app/node_modules /usr/local/app/node_modules

EXPOSE 3000

CMD [ "node", "dist/server.js" ]
