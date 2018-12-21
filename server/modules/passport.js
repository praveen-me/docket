const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');

module.exports = (passport) => {
  // serialize the user session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // deserialize the user session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
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
};
