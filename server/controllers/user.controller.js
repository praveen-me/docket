const User = require('./../models/User');
const passport = require('passport');

module.exports = {
  signUp : (req, res) => {
    const newUser = new User({
      ...req.body
    })

    User.findOne({username : req.username}, (err, data) => {
      if(!data) {
        return res.status(302).json({
          msg : 'username is not avilable'
        })
      } else {
        newUser.save((err, data) => {
          res.json({
            user : data
          })
        })
      }
    })
  }, 
  logIn : (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
        return res.status(404).json({
          msg : "Acount not available. Please Sign Up."
        }) 
      }
      req.logIn(user, function(err) {
        if (err) { 
          return next(err);
        }
        User.findOne({_id : user._id} , {password : 0}, (err, data) => {
          return res.json({
            user : data
          })
        })
      });
    })(req, res, next);
  }
}