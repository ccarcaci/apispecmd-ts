# docker build --tag apispecmd-ts .
# docker run --rm --name apispecmd-ts --volume /home/ccarcaci/git/apispecmd-ts/openapi/markdowns:/app/output apispecmd-ts:latest

FROM node:lts-alpine3.14

WORKDIR /app

COPY apispecmd-ts-0.0.1.tgz .
RUN npm install --global apispecmd-ts-0.0.1.tgz
RUN rm apispecmd-ts-0.0.1.tgz

# RUN npm install --global @bitacode/apispecmd-ts

COPY openapi/examples/petstore.yaml ./input/
RUN mkdir output

ENV INPUT_SPEC=input/petstore.yaml
ENV OUTPUT_MARKDOWN=output/petstore.md

CMD [ "apispecmd-ts" ]
