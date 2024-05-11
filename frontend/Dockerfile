FROM node:22.1.0-alpine3.19

WORKDIR /frontend

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml . 

RUN pnpm install 

COPY . .

RUN pnpm  build

EXPOSE 3000

CMD ["pnpm", "start"]