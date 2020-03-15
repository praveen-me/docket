const express = require("express");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("./../modules/auth");
const config = require("config");

module.exports = userController => {
  const router = express.Router();

  router.post("/signup", async (req, res) => {
    const { userCreds } = req.body;

    const hashedPassword = bcrypt.hashSync(userCreds.password, SALT_ROUNDS);

    userCreds.password = hashedPassword;

    await userController.signUp(userCreds);

    return res.status(200).json({
      msg: "username is not available"
    });
  });

  router.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, { message = "" }) => {
      if (err) return next(err);

      if (!user) {
        return res.status(404).json({
          msg: message || "Account not available. Please Sign Up."
        });
      }

      return req.logIn(user, error => {
        if (error) return next(error);

        res.json({
          user,
          token: jwt.sign({ user }, config.get("jwtSecret"))
        });
      });
    })(req, res, next);
  });

  router.get("/isLoggedIn", auth.isLoggedIn, (req, res) => {
    res.json({
      user: req.user
    });
  });

  return router;
};
