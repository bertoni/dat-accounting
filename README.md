# dat-accounting-app

> An application to control your accounting made by Vue.js + Dat

[![Build Status](https://travis-ci.org/bertoni/dat-accounting.svg?branch=master)](https://travis-ci.org/bertoni/dat-accounting)
[![codecov](https://codecov.io/gh/bertoni/dat-accounting/branch/master/graph/badge.svg)](https://codecov.io/gh/bertoni/dat-accounting)
[![GitHub license](https://img.shields.io/github/license/bertoni/dat-accounting.svg)](https://github.com/bertoni/dat-accounting/blob/master/LICENSE)



## Run the projet with Docker

``` bash
# First, copy the file infra/docker-compose-sample.yml to infra/docker-compose.yml

    cp infra/docker-compose-sample.yml infra/docker-compose.yml


# Open the file infra/docker-compose.yml and change parameters for your use (need to change path project and localtime path. Linux distros usually is in /etc/localtime, in macOs in /usr/share/zoneinfo/some-locality, windows i'm sorry).

    sed -i 's/path\/your\/project/var\/www\/dataccounting\/newapp/' infra/docker-compose.yml

    sed -i 's/path\/your\/localtime/etc\/localtime/' infra/docker-compose.yml


# Install all dependencies (not forget to change path to your project)

    docker run -it --rm --user node -v /path/your/project/:/var/www/app -v /path/your/localtime:/etc/localtime node:8 yarn --cwd /var/www/app/ install --pure-lockfile


# Up containers to view project

    docker-compose -f infra/docker-compose.yml up -d

# Generate build to share with Dat

    docker run -it --rm --user node -v /path/your/project/:/var/www/app -v /path/your/localtime:/etc/localtime node:8 npm --prefix /var/www/app/ run build


```
