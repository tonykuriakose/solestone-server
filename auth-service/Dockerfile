FROM node:23-alpine


WORKDIR /app



COPY package*.json ./


RUN npm install

RUN npm install -g nodemon


COPY . .


RUN npx prisma generate


EXPOSE 3001


CMD ["npm", "run", "dev"]
