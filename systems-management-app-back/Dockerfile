FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN apk add bash
RUN npx prisma generate

# Copie o wait-for-it.sh para o diretorio e torne-o executável
COPY wait-for-it.sh ./
# Permição:
RUN chmod +x wait-for-it.sh

CMD /usr/src/app/wait-for-it.sh database:3306 -t 60 -- npx prisma migrate reset --force && npm start
