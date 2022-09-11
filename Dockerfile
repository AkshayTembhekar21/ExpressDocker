FROM node:14.15.4

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 4000
ENTRYPOINT ["nodemon", "server.js"]