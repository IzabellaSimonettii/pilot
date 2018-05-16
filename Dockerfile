FROM node:8.11.1-alpine

ENV SHELL /bin/sh

COPY ./package.json /code/package.json
COPY ./packages/cockpit/src /code/packages/cockpit/src
COPY ./packages/cockpit/.babelrc /code/packages/cockpit/.babelrc
COPY ./packages/cockpit/package.json /code/packages/cockpit/package.json
COPY ./packages/pilot/package.json /code/packages/pilot/package.json

WORKDIR /code

RUN npm config set cache /cache/npm --global && \
    yarn config set cache-folder /cache/yarn && \
    yarn
