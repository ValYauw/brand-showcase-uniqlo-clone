FROM node:18.17

WORKDIR /users

ENV PORT=4001

COPY package.json package-lock.json /users/

RUN npm install 
RUN npm cache clean --force

COPY . .

CMD ["node", "bin/www.js"]