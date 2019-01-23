FROM basaltinc/docker-node-php-base:latest
# @todo replace with `boltdesignsystem/bolt-docker:latest` once that is configured correctly

FROM node:10-slim

RUN apt-get update \
    && apt-get install -yq software-properties-common gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont git-core \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
    && wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb \
    && dpkg -i dumb-init_*.deb \
    && rm -f dumb-init_*.deb \
    && apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && yarn global add puppeteer@1.11.0 \
    && yarn cache clean

# PHP
RUN LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php && apt-get update && apt-get install --no-install-recommends -y \
    php7.2 \
    php7.2-curl \
#    php7.2-gd \
    php7.2-dev \
    php7.2-xml \
    php7.2-bcmath \
#    php7.2-mysql \
    php7.2-mbstring \
    php7.2-zip \
    php7.2-bz2 \
    php7.2-sqlite \
#    php7.2-soap \
    php7.2-json \
#    php7.2-intl \
#    php7.2-imap \
#    php7.2-imagick \
#    php-xdebug \
#    php-memcached && \
    rm -rf /var/lib/apt/lists/* && \
    command -v php

# Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer && \
    composer self-update --preview
RUN command -v composer

WORKDIR /app

ENTRYPOINT ["dumb-init", "--"]

COPY . .
EXPOSE 3123
RUN composer global require hirak/prestissimo
RUN yarn run setup
RUN yarn run build

CMD yarn serve
