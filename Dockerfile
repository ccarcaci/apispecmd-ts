FROM node:fermium-alpine3.14

WORKDIR /app

# Installs latest Chromium (89) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v6.0.0 works with Chromium 89.
RUN npm install --global puppeteer@6.0.0

COPY bitacode-apispecmd-ts-0.0.2.tgz .
RUN npm install --global bitacode-apispecmd-ts-0.0.2.tgz
# RUN npm install --global --unsafe-perm @bitacode/apispecmd-ts

CMD [ "apispecmd-ts" ]
