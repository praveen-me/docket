const { AuthenticationError } = require("apollo-server-express");
const User = require("./../models/User");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const { GraphQLLocalStrategy } = require("graphql-passport");

module.exports = passport => {
  // serialize the user session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  /*
   * this middleware takes username and passport and use LocalStrategy() after login
   * and then compare the username and password with db
   * and proceed request according to it
   */
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new AuthenticationError("Incorrect username");
        }

        const isValidatePassword = await user.validPassword(password);

        if (!isValidatePassword) {
          throw new AuthenticationError("Password is wrong");
        }

        done(null, user);
      } catch (e) {
        throw new Error(err);
      }
    })
  );
};
