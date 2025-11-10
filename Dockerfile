FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=8080

EXPOSE 8080

CMD sh -c "npx prisma db push && node server.js"
