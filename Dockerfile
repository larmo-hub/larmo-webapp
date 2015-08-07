FROM debian:jessie
MAINTAINER Marcin Wójcik <mwojcik@future-processing.com>, Mateusz Książek <mksiazek@future-processing.com>

RUN apt-get update && \
    apt-get -yq --no-install-recommends install \
        nodejs-legacy \
        npm \
        ruby \
        git \
     && apt-get purge -y --auto-remove \
     && rm -rf /var/lib/apt/lists/*

WORKDIR /data/larmo-webapp

RUN gem install sass
RUN npm install -g bower
RUN npm install -g grunt-cli

EXPOSE 8080

CMD [ "bash","-c", "npm install --ignore-scripts; npm run-script development-start" ]
