const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = (passport) => {
  // serialize the user session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  /* 
   * this middleware takes username and passpord and use LocalStartegy() after login 
   * and then compare the username and password with db
   * and proceed request according to it
  */
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        // validates the decrypted password and compares it 
        return user.validPassword(password, (e, isMatched) => {
          if (!isMatched) return done(null, false);
          return done(null, user);
        });
      });
    },
  ));

  passport.use(
    new GoogleStrategy(
     {
      clientID: "148990038385-icegjin0023i0j0m8iu14j8p6c0bm0je.apps.googleusercontent.com",
      clientSecret: "pQP7hEsHyemxgG_DtxqjfY6x",
      callbackURL: "http://localhost:8001/api/google/callback"
     },
     function(accessToken, refreshToken, profile, done) {
      const userSession = {
        token : accessToken
      }
      const email = profile.emails[0].value
      User.findOne({ gID: profile.id }, (err, data) => {
        console.log(data)
        if(!data) {
          const newUser = new User({
            gID : profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
          })
          newUser.save((err, userData) => {
            return done(null, {
              ...userSession,
              data : userData
            });
          })
        } else {
          return done(null, {
            ...userSession,
            data
          });
        }
      })
     }
    ))
};
