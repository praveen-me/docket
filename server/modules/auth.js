const { userController } = require("./../../db.js");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * this function  user is logged in or not
 * and performs actions according to it
 */
module.exports = {
  isLoggedIn: async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === 'null') {
      res.status(401).json({
        msg: "Please sign in"
      });
      return;
    }

    if (authorization !== "null") {
      console.log("here")
      const resFromToken = jwt.verify(authorization, config.get("jwtSecret"));

      const { user } = resFromToken;

      if (user) {
        await userController.verifyUser(user.username, user => {
          if (user) {
            delete user.password;

            req.user = user;
            next();
          } else {
            res.status(401).json({
              msg: "Please sign in"
            });
          }
        });
      }
    }
  }
};
