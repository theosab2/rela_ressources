#Using Node alpine image
FROM node:alpine as node

#Setting Working directory
WORKDIR /containerized/relaRessources_API

#Copy package.json & package-lock.json files
COPY package.json .
COPY package-lock.json .

#Run npm continuous integration
RUN npm ci --omit=dev

#Copy the rest of the files (some are axcluded by '.dockerignore')
COPY . .

#Open corresponding port for API
EXPOSE 3001

#Start node API application
CMD ["npm","start"]