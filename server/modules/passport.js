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
        console.log("here");
        throw new Error(err);
      }
    })
  );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID:
  //         "148990038385-icegjin0023i0j0m8iu14j8p6c0bm0je.apps.googleusercontent.com",
  //       clientSecret: "pQP7hEsHyemxgG_DtxqjfY6x",
  //       callbackURL: "http://localhost:8001/api/google/callback"
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       const userSession = {
  //         token: accessToken
  //       };
  //       const email = profile.emails[0].value;
  //       User.findOne({ email }, (err, data) => {
  //         if (!data) {
  //           const newUser = new User({
  //             gId: profile.id,
  //             email: profile.emails[0].value,
  //             fullName: profile.displayName
  //           });
  //           newUser.save((err, userData) => {
  //             return done(null, {
  //               ...userSession,
  //               data: userData
  //             });
  //           });
  //         } else {
  //           if (!data.gitId) {
  //             return done(null, {
  //               ...userSession,
  //               data
  //             });
  //           } else {
  //             return done(null, false);
  //           }
  //         }
  //       });
  //     }
  //   )
  // );

  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: "a59fb1c7d55495eb4ad5",
  //       clientSecret: "6ed3eae023c7b3241506b9aefef9ba3fde62bf05",
  //       callbackURL: "http://localhost:8001/api/github/callback"
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       const userSession = {
  //         token: accessToken
  //       };
  //       const email = profile.emails[0].value;
  //       User.findOne({ email }, (err, data) => {
  //         if (!data) {
  //           const newUser = new User({
  //             gitId: profile.id,
  //             email: profile.emails[0].value,
  //             fullName: profile.displayName
  //           });
  //           newUser.save((err, userData) => {
  //             return done(null, {
  //               ...userSession,
  //               data: userData
  //             });
  //           });
  //         } else {
  //           if (!data.gId) {
  //             return done(null, {
  //               ...userSession,
  //               data
  //             });
  //           } else {
  //             return done(null, false);
  //           }
  //         }
  //       });
  //     }
  //   )
  // );
};
