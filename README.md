# @meanie/passport-refresh-strategy

[![npm version](https://img.shields.io/npm/v/@meanie/passport-refresh-strategy.svg)](https://www.npmjs.com/package/@meanie/passport-refresh-strategy)
[![node dependencies](https://david-dm.org/meanie/passport-refresh-strategy.svg)](https://david-dm.org/meanie/passport-refresh-strategy)
[![github issues](https://img.shields.io/github/issues/meanie/passport-refresh-strategy.svg)](https://github.com/meanie/passport-refresh-strategy/issues)
[![codacy](https://img.shields.io/codacy/7872d6222f1348a8aa9df98f422ad007.svg)](https://www.codacy.com/app/meanie/passport-refresh-strategy)


A refresh token authentication strategy for Passport

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @meanie/passport-refresh-strategy

#npm
npm install @meanie/passport-refresh-strategy --save
```

## Usage

```js
//Dependencies
const passport = require('passport');
const jwt = require('@meanie/express-jsonwebtoken');
const RefreshStrategy = require('@meanie/passport-refresh-strategy');
const {InvalidTokenError} = jwt;

//Your custom user service
const User = require('./user.service');

//Setup strategy
passport.use(new RefreshStrategy((refreshToken, cb) => {

  //No refresh token?
  if (!refreshToken) {
    return cb(null, false);
  }

  //Validate token
  jwt
    .validate(refreshToken)
    .then(User.findByTokenPayload)
    .then(user => {
      if (!user) {
        throw new InvalidTokenError('No matching user found');
      }
      return cb(null, user);
    })
    .catch(cb);
}));
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/passport-refresh-strategy issue tracker](https://github.com/meanie/passport-refresh-strategy/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Sponsor

This package has been kindly sponsored by [Hello Club](https://helloclub.com?source=meanie), an [all in one club and membership management solution](https://helloclub.com?source=meanie) complete with booking system, automated membership renewals, online payments and integrated access and light control. Check us out if you happen to belong to any kind of club or if you know someone who helps run a club!

## License

(MIT License)

Copyright 2016-2020, Adam Reis
