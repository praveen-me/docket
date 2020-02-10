/**
 * this function  user is logged in or not
 * and performs actions according to it
*/
module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        msg: 'You are not loggedIn. Please Log In',
      });
    } else if(!req.user.msg) {
      return next();
    }
  },
};
