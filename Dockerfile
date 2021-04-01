FROM node:12

WORKDIR /app

COPY . /app

RUN npm install

CMD npm run start

EXPOSE 3000