const { AuthenticationError } = require("apollo-server-express");
const passport = require("passport");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async input => {
    const { username } = input;

    const newUser = new User({
      ...input
    });

    const isUserExists = await User.findOne({ username });
    if (isUserExists) {
      throw new AuthenticationError("Username is not available");
    }

    const user = await newUser.save();
    return user;
  },
  logIn: async (input, context) => {
    try {
      const { user } = await context.authenticate("graphql-local", {
        ...input
      });

      await context.login(user);

      const token = jwt.sign(
        {
          payload: user
        },
        process.env.JWT_SECRET
      );

      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  },
  isLoggedIn: (req, res) => {
    if (req.user) {
      const { username, _id } = req.user;
      User.findOne(
        { _id: username ? req.user._id : req.user.data._id },
        { password: 0 },
        (err, data) => {
          if (err) throw err;
          if (!data) {
            return res.status(401).json({
              msg: "You are not logged in."
            });
          }
          return res.json({
            user: data
          });
        }
      );
    } else {
      return res.status(401).json({
        msg: "You are not logged in."
      });
    }
  },
  logOut: (req, res) => {
    req.session.destroy(function(e) {
      req.logout();
      // res.redirect('/');
      res.status(200).json({
        msg: "Logout Completed"
      });
    });
  },
  callbackGoogle: passport.authenticate("google", {
    failureRedirect: "/",
    session: true
  }),
  function(req, res) {
    res.redirect("/");
  }
};
