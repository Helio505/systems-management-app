# # Imagem sendo utilizada:
# FROM nginx
# WORKDIR /usr/share/nginx/
# FROM node:18.16-slim

# FROM node:18.16
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# CMD ["npm", "start"]

FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN apk add bash
# RUN prisma migrate
# CMD ["npm", "start"]

# Copie o wait-for-it.sh para o diretorio e torne-o executável
COPY wait-for-it.sh ./
# Permição:
RUN chmod +x wait-for-it.sh

# Configure o comando para esperar pelo banco de dados e, em seguida, iniciar a aplicação
CMD /usr/src/app/wait-for-it.sh database:3306 -t 30 -- npx prisma migrate dev && npm start