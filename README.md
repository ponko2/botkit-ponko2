# botkit-ponko2

[![Greenkeeper badge](https://badges.greenkeeper.io/ponko2/botkit-ponko2.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/ponko2/botkit-ponko2.svg?branch=master)](https://travis-ci.org/ponko2/botkit-ponko2)

## Usage

```sh
$ heroku create
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
```

```sh
$ heroku config:set BOTKIT_SLACK_TOKEN=xoxb-01234567890-XXXXXXXXXXXXXXXXXXXXXXXX
$ heroku config:set BOTKIT_HEROKU_KEEPALIVE_URL=$(heroku apps:info -s | grep web-url | cut -d= -f2)
$ heroku config:set BOTKIT_HEROKU_WAKEUP_TIME=8:00
$ heroku config:set BOTKIT_HEROKU_SLEEP_TIME=1:30
$ heroku config:set TZ='Asia/Tokyo'
```

```sh
$ heroku addons:create rediscloud:30
$ heroku addons:create scheduler:standard
$ heroku addons:open scheduler
```

```sh
$ curl ${BOTKIT_HEROKU_KEEPALIVE_URL}heroku/keepalive
```
