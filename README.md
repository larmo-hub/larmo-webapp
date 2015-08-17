# Larmo - Web Application

[![Build Status](https://travis-ci.org/mejt/larmo-webapp.svg)](https://travis-ci.org/mejt/larmo-webapp)
[![Dependency Status](https://david-dm.org/mejt/larmo-webapp.png)](https://david-dm.org/mejt/larmo-webapp)

Web application for presenting stored messages from *Larmo Hub*. Powered by node.js

## Supported features

* displaying latest messages

## Installation guide

You can start application in two ways (thanks docker and traditionally).

### DOCKER
#### docker-compose
Come on to console, and type ```docker-compose up``` 
- After all processes your webapp will work on address **http://localhost:5000**

**TIP** If you want to run container in background then run command *docker compose up* with *-d* flag: ```docker-compose up -d```

Setup your larmo-hub address in file *docker-compose.yml* as **API_URL** environment variable (default is localhost:5100):
```yml
environment:
    - API_URL=http://0.0.0.0:5100
```

#### docker
* Linux
    ```bash
    sudo docker build -t webapp .
    sudo docker run -p 5000:8080 -i -d -t -v $(pwd):/data/larmo-webapp webapp
    ```

* Windows

    Prepare host for windows:
    ```bash
    boot2docker init
    boot2docker up
    eval "$(boot2docker shellinit)"
    ```
    
    Get docker host ip (typically 192.168.59.103).
    ```bash
    boot2docker ip
    ```
    
    Run docker commands:
    ```bash
    sudo docker build -t webapp .
    sudo docker run -p 5000:8080 -i -d -t -v YOUR_CURRENT_PROJECT_DIRECTORY:/data/larmo-webapp webapp
    ```
    
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
