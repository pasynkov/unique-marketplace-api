FROM node:latest

WORKDIR /src

COPY . .

RUN git submodule update --init --recursive && yarn install

EXPOSE 5000

CMD ["yarn", "start"]