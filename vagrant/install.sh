#!/usr/bin/env bash

apt-get update
apt-get install --yes curl

curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -

apt-get install --yes nodejs
apt-get install --yes ruby
apt-get install --yes git

gem install sass --no-ri --no-rdoc
npm install -g bower
npm install -g grunt-cli
