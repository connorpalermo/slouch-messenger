FROM node:16.14.2

LABEL version="1.0"
LABEL description="This is the base docker image for the Slouch Messenger backend API."
LABEL maintainer="cjpalermo1996@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5001

CMD ["node", "index.js"]