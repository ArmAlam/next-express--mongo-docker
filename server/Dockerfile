FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=root

CMD [ "npm", "run", "start" ]