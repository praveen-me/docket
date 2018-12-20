const User = require('./../models/User');
const passport = require('passport');

module.exports = {
  signUp : (req, res) => {
    const newUser = new User({
      ...req.body
    })

    User.findOne({username : req.body.username}, (err, data) => {
      if(!data) {
        newUser.save((err, data) => {
          res.json({
            user : data
          })
        })
      } else {
        return res.status(302).json({
          msg : 'username is not avilable'
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
  },
  isLoggedIn : (req, res) => {
    if(req.user) {
      User.findOne({_id : req.user._id} , {password : 0}, (err, data) => {
        return res.json({
          user : data
        })
      })
    } else {
      res.status(401).json({
        msg : 'You are not logged in.'
      })
    }
  }, 
  logOut : (req, res) => {
    console.log('logout called')
    if(req.user._id) {
      req.logOut();
      res.status(200).status({
        msg : "Log out Successfull."
      })
    }
  }
}