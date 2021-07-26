# docker build --tag apispecmd-ts .

FROM node:lts-alpine3.14

WORKDIR /app

COPY apispecmd-ts-0.0.1.tgz .
RUN npm install --global apispecmd-ts-0.0.1.tgz
RUN rm apispecmd-ts-0.0.1.tgz

# RUN npm install --global @bitacode/apispecmd-ts

COPY openapi/examples/petstore.yaml ./input/
RUN mkdir output

CMD [ "apispecmd-ts" ]
