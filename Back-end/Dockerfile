FROM node:18 as node

WORKDIR /relaRessources_API
ADD . .


RUN RUN npm ci --only=production

EXPOSE 3001

CMD npm run start