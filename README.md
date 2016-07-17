# passport-refresh-strategy

[![npm version](https://img.shields.io/npm/v/meanie-passport-refresh-strategy.svg)](https://www.npmjs.com/package/meanie-passport-refresh-strategy)
[![node dependencies](https://david-dm.org/meanie/passport-refresh-strategy.svg)](https://david-dm.org/meanie/passport-refresh-strategy)
[![github issues](https://img.shields.io/github/issues/meanie/passport-refresh-strategy.svg)](https://github.com/meanie/passport-refresh-strategy/issues)
[![codacy](https://img.shields.io/codacy/7872d6222f1348a8aa9df98f422ad007.svg)](https://www.codacy.com/app/meanie/passport-refresh-strategy)
[![Join the chat at https://gitter.im/meanie/meanie](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/meanie/meanie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A refresh token authentication strategy for Passport, for use with [Meanie Express Seed](https://github.com/meanie/express-seed) projects

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `npm`.

```shell
npm install meanie-passport-refresh-strategy --save
```

## Usage

```js
//Dependencies
let passport = require('passport');
let RefreshStrategy = require('meanie-passport-refresh-strategy');

//Setup strategy (where `User` is your custom user service)
passport.use(new RefreshStrategy((refreshToken, cb) => {

  //No refresh token?
  if (!refreshToken) {
    return cb(null, false);
  }

  //Validate token
  tokens.validate('refresh', refreshToken)
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

Please report any bugs, issues, suggestions and feature requests in the [meanie-passport-refresh-strategy issue tracker](https://github.com/meanie/passport-refresh-strategy/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits

* Meanie logo designed by [Quan-Lin Sim](mailto:quan.lin.sim+meanie@gmail.com)

## License
(MIT License)

Copyright 2016, [Adam Buczynski](http://adambuczynski.com)
