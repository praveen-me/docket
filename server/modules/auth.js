module.exports = {
  isLoggedIn : (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({
        msg : "You are not loggedIn. Please Log In"
      })
    } else {
      next();
    }
  }
}