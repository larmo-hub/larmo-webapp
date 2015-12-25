# Larmo - Web Application

[![Build Status](https://travis-ci.org/larmo-hub/larmo-webapp.svg)](https://travis-ci.org/larmo-hub/larmo-webapp)
[![Dependency Status](https://david-dm.org/larmo-hub/larmo-webapp.svg)](https://david-dm.org/larmo-hub/larmo-webapp)
[![bitHound Score](https://www.bithound.io/github/larmo-hub/larmo-webapp/badges/score.svg)](https://www.bithound.io/github/larmo-hub/larmo-webapp)
[![Docs](https://readthedocs.org/projects/larmo/badge/?version=latest)](http://docs.larmo.org/)

Web application for presenting stored messages from *Larmo Hub*. Powered by node.js

## Supported features

* displaying latest messages

## Documentation

Documentation for projects hosted on [readthedocs.org](https://readthedocs.org) is available on the [docs.larmo.org](http://docs.larmo.org).

## Installation guide

You can start application in two ways (thanks docker and traditionally).

### Docker

* Linux

    ```bash
    $: sudo docker build -t larmo-webapp .
    $: sudo docker run -p 5000:8080 -i -d -t -v $(pwd):/data/larmo-webapp larmo-webapp
    ```

    Access to *Larmo Web Application*:

    - [http://192.168.99.100:5000](http://192.168.99.100:5000)
    
* Windows

    Prepare host for Windows:
 
    ```bash
    $: docker-machine start boot2docker-vm
    $: eval "$(docker-machine env boot2docker-vm)"
    ```
 
    Get docker host ip (typically 192.168.99.100):

    ```bash
    $ docker-machine ip boot2docker-vm
    192.168.99.100
    ```

    Run docker commands:

    ```bash
    $: docker build -t larmo-webapp .
    $: docker run -p 5000:8080 -i -d -t- v .:/data/larmo-webapp larmo-webapp
    ```

    Access to *Larmo Web Application*:

    - [http://192.168.99.100:5000](http://192.168.99.100:5000)

### Normal environment to run

#### Requires for development

- *node.js*
- *npm*
- for development:
    - *ruby* with *sass gem*
    - bower
    - grunt

#### 1. Install dependencies by npm

Run in your console command ```npm install --ignore-scripts``` and wait to install all required dependencies.

#### 2. Run application

Starting application is very easy, if you don't want use any settings, and start development mode then run command 
```npm development-start``` and go to site *localhost:8080* in your browser.

If you want to start production mode, then run command ```npm postinstall``` and ```npm start```.

If you want run application with your settings then you'll set environment variables before.

Available environment variables:

- ```PORT``` - set port (default 8080)
- ```MODE_ENV``` - set mode *production* or *dev* (default dev)
- ```API_URL``` - set Larmo Hub API URL (default is localhost:port)

## Deployment

Application is ready to deploy to Heroku. 

- Create heroku app ```heroku create``` or add exists app ```heroku git:remote -a APP_NAME```
- Push all changes to heroku ```git push heroku master --force```

## Authors

* [Adrian Piętka](mailto:apietka@future-processing.com)
* [Mateusz Książek](mailto:mksiazek@future-processing.com)
