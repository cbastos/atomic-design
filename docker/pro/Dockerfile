FROM node:7.5
RUN mkdir /build
WORKDIR /build
COPY . /build
RUN npm install --production
RUN npm rebuild node-sass
RUN npm test
RUN npm run build:pro

FROM node:7.5
RUN mkdir /app
WORKDIR /app
COPY --from=0 /build/dist/app .
COPY --from=0 /build/package.json .
RUN npm install express
EXPOSE 9000
CMD [ "node", "./app.js"]