ARG NODE_IMAGE_NAME=18-bullseye-slim
ARG NODE_ENV=development
FROM reg01.simpleone.ru/dockerhub/library/node:${NODE_IMAGE_NAME} AS deps
RUN npm install -g npm

WORKDIR /app
ENV NODE_ENV=${NODE_ENV}

COPY package*.json .
RUN --mount=type=cache,target=/root/.npm,sharing=locked npm ci && npm audit fix --audit-level=critical

FROM reg01.simpleone.ru/dockerhub/library/node:${NODE_IMAGE_NAME} AS builder
RUN npm install -g npm

WORKDIR /app
ENV NODE_ENV=${NODE_ENV}

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM reg01.simpleone.ru/dockerhub/library/node:${NODE_IMAGE_NAME}
RUN npm install -g npm
RUN apt-get update && \
    apt-get install -y openssl ca-certificates

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json /app/tsconfig.json /app/tsconfig.build.json /app/nest-cli.json ./

CMD ["npm", "run", "start:prod"]
