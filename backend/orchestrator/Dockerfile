FROM node:18.17

WORKDIR /orchestrator

ENV PORT=4000

COPY package.json package-lock.json /orchestrator/

RUN npm install
RUN npm cache clean --force

COPY . .

CMD ["node", "app.js"]