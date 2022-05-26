FROM node:16.14.2

LABEL version="1.0"
LABEL description="This is the base docker image for the Slouch Messenger frontend react app."
LABEL maintainer="cjpalermo1996@gmail.com"

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --legacy-peer-deps --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]