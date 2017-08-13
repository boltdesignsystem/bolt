FROM mhart/alpine-node:latest


RUN  apk update && apk upgrade && \

    apk add libressl && \
    apk add curl && \
    apk add git && \
    apk add make && \
    apk add openssl && \
    apk add python && \
    apk add yaml && \
    apk add php7 && \
    apk add g++ && \
    apk add php7-openssl && \
    apk add php7-mbstring && \
    apk add php7-apcu && \
    apk add php7-ctype && \
    apk add php7-tokenizer && \
    apk add php7-intl && \
    apk add php7-mcrypt && \
    apk add php7-json && \
    apk add php7-gd && \
    apk add php7-curl && \
    apk add php7-fpm && \
    apk add php7-phar && \
    apk add php7-zlib && \

    # install composer
    cd /tmp && curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer && \

    composer global require hirak/prestissimo && \

    #clear cache
    rm -rf /var/cache/apk/*

ENV HOME /srv/app
RUN mkdir $HOME
WORKDIR $HOME

ADD . $HOME/

RUN cd sandbox/pattern-library && rm -rf composer.lock && rm -rf vendor && composer install --no-interaction | npm install -g lerna gulpjs/gulp-cli && npm install gulpjs/gulp#4.0 && \
    npm install gulp && lerna bootstrap

RUN gulp build
