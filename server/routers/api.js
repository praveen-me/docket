const express = require("express");

const router = express.Router();
const passport = require("passport");

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  function(req, res) {
    // Successfully redirection to home
    res.redirect("/");
  }
);

module.exports = router;
