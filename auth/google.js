var winston = require('winston');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      winston.info(profile.displayName + ' logged in', { timestamp: new Date() });
      done(null, { id: profile.displayName });
  }
));
