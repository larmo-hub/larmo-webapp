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

ADD ./package.json /data/larmo-webapp/package.json
RUN npm install --ignore-scripts

ADD ./bower.json /data/larmo-webapp/bower.json
ADD ./.bowerrc /data/larmo-webapp/.bowerrc

EXPOSE 8080

CMD [ "bash","-c", "npm run-script development-start" ]
