FROM node:alpine
COPY package.json /package.json
COPY ./dist /dist

# Change mirrors to tsinghua
RUN echo http://mirrors.tuna.tsinghua.edu.cn/alpine/edge/main > /etc/apk/repositories && \
    echo http://mirrors.tuna.tsinghua.edu.cn/alpine/edge/community >> /etc/apk/repositories && \
    echo http://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing >> /etc/apk/repositories && apk update

# Setting timezone
RUN apk add tzdata openssh-client git
RUN cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Installs latest Chromium (92) package.
RUN apk update && \
    apk upgrade && \ 
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont 

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


# Run everything after as non-privileged user.

RUN yarn config set registry 'https://registry.npm.taobao.org' && \
    yarn global add pm2 && \
    yarn install --production && \
    yarn cache clean 

EXPOSE 3333

CMD [ "node", "/dist/index.cjs" ]