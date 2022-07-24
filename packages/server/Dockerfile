# syntax=docker/dockerfile:1

FROM node:16.15.1-alpine3.16 AS builder

WORKDIR app

COPY ["packages/server/package.json", "yarn.lock", "./"]

RUN yarn install

COPY packages/server/tsconfig.json ./
COPY packages/server/src ./src

RUN yarn build

FROM node:16.15.1-alpine3.16 AS app

WORKDIR app

COPY ["packages/server/package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY --from=builder app/dist ./dist
COPY --from=builder app/temp ./temp

RUN rm yarn.lock

FROM node:16.15.1-alpine3.16

WORKDIR app

ENV NODE_ENV=production

USER node

COPY --from=app app ./

EXPOSE 8080

CMD [ "yarn", "start" ]
