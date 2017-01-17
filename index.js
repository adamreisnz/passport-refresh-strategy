'use strict';

/**
 * Dependencies
 */
const util = require('util');
const Strategy = require('passport-strategy');

/**
 * Define refresh token strategy
 */
function RefreshStrategy(options, verify) {

  //Parameter juggling
  if (typeof options === 'function') {
    verify = options;
    options = {};
  }

  //Setup strategy
  Strategy.call(this);
  this.name = 'refresh';
  this._verify = verify;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(RefreshStrategy, Strategy);

/**
 * Authenticate request based on refresh token in http only cookie
 */
RefreshStrategy.prototype.authenticate = function(req) {

  //Get refresh token from cookies
  const refreshToken =
    req.cookies.refresh_token || req.cookies.refreshToken || null;

  //Call verify handler
  this._verify(refreshToken, (error, user, info) => {
    if (error) {
      return this.error(error);
    }
    if (!user) {
      info = info || {};
      return this.fail('invalid_token', info);
    }
    this.success(user, info);
  }, req);
};

/**
 * Expose strategy
 */
module.exports = RefreshStrategy;
