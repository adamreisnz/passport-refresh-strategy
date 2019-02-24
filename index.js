'use strict';

/**
 * Dependencies
 */
const Strategy = require('@passport-next/passport-strategy');

/**
 * Refresh strategy
 */
class RefreshStrategy extends Strategy {

  /**
   * Constructor
   */
  constructor(options, callback) {

    //Call parent constructor
    super();

    //Parameter juggling
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    //Setup strategy
    this.name = 'refresh';
    this.callback = callback;
  }

  /**
   * Authenticate request based on refresh token in http only cookie
   */
  authenticate(req) {

    //Get refresh token hash from cookies
    const hash = req.cookies.refreshToken;

    //Get access token from headers
    const auth = req.header('Authorization');
    const parts = auth ? auth.split('Bearer ') : [];
    const accessToken = parts[1] || null;

    //Call callback
    this.callback(req, hash, accessToken, (error, user, info) => {
      if (error) {
        return this.error(error);
      }
      if (!user) {
        info = info || {};
        return this.fail('invalid_token', info);
      }
      this.success(user, info);
    }, req);
  }
}

/**
 * Expose strategy
 */
module.exports = RefreshStrategy;
