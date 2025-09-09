FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

RUN chmod +x ./scripts/migrate-and-start.sh

CMD ["sh","./scripts/migrate-and-start.sh"]


# A ENLEVER POUR LA PROD
# CMD ["npm", "run", "dev"]

# A METTRE POUR LA PROD
# CMD ["npm", "start"] 
