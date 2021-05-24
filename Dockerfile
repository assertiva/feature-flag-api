FROM node:12.18.1
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
CMD ["yarn", "start"]
