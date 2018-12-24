/**
 * this function  user is logged in or not
 * and performs actions according to it
*/
module.exports = {
  isLoggedIn: (req, res, next) => {
    console.log(req.user, "in auth")
    if (!req.user) {
      return res.status(401).json({
        msg: 'You are not loggedIn. Please Log In',
      });
    } else if(!req.user.msg) {
      console.log("check in auth")
      return next();
    }
  },
};
