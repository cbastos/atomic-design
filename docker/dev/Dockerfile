FROM node:7.5

RUN mkdir /app
VOLUME /app
WORKDIR /app
RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]