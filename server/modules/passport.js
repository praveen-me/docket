const { AuthenticationError } = require("apollo-server-express");
const User = require("./../models/User");

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
      let error = null;
      const user = await User.findOne({ username });

      if (user === null) {
        error = new AuthenticationError("Incorrect Username!");
      }

      if (user) {
        const isValidatePassword = await user.validPassword(password);

        if (!isValidatePassword) {
          error = new AuthenticationError("Wrong Password!");
        }
      }

      done(error, user);
    })
  );
};
