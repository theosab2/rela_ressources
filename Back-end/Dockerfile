#Using Node alpine image
FROM node:alpine as node

#Setting Working directory
WORKDIR /containerized/relaRessources_API

#Copy package.json & package-lock.json files
COPY package.json .
COPY package-lock.json .

#Run npm continuous integration
RUN npm ci --omit=dev

#Install node_modules and clear cache
RUN npm install && npm cache clean --force
#Copy the rest of the files (some are axcluded by '.dockerignore')
COPY . .

#Start node API application
CMD ["npm","start"]