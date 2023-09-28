FROM node:18.17.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm i -g pnpm
RUN npm i -g serve
RUN pnpm install
