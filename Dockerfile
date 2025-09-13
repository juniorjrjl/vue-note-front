FROM node:22.2.0

RUN apt-get update && apt-get install -qq -y --no-install-recommends && apt-get upgrade -y && apt-get clean

ENV INSTALL_PATH=/vue-note-front

RUN mkdir -p "$INSTALL_PATH"

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm i -D vite@7.0.6 @vitejs/plugin-vue@6.0.1 && npm i

COPY . .