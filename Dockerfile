FROM mhart/alpine-node:12

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

ENV NODE_ENV=production

RUN npm install --production

COPY . ./

EXPOSE 5000

CMD ["node", "app/index.mjs"]
