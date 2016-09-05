var winston = require('../config/winston');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      winston.info(profile.displayName + ' logged in');
      done(null, { id: profile.displayName });
  }
));
