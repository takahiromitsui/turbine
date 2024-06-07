FROM node:20-slim AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]