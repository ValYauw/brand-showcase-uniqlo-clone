FROM node:18.17

WORKDIR /app

ENV PORT=4002

COPY package.json package-lock.json /app/

RUN npm install 
RUN npm cache clean --force

COPY . .

CMD ["node", "bin/www.js"]