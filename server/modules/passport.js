const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.validPassword(password, function(err, isMatched) {
          if(!isMatched) return done(null, false)
          return done(null, user)
        })
      });
    }
  ));
}