#!/usr/bin/env bash

echo "Check that /data/webapp directory is exists"
if [ -d "/data/webapp" ];
then
    echo "Go to /data/webapp"
    cd /data/webapp

    echo "Install node scripts"
    npm install --ignore-scripts

    echo "Install bower depedencies"
    bower install --allow-root --config.interactive=false

    echo "Run application"

    API_URL=http://larmo-hub.herokuapp.com grunt
else
    echo "Directory /data/webapp not exists"
fi
