const passport = require('passport');
const User = require('./../models/User');

module.exports = {
  signUp: (req, res) => {
    const newUser = new User({
      ...req.body,
    });

    User.findOne({ username: req.body.username }, (err, data) => {
      if (!data) {
        return newUser.save((error, userData) => {
          if (err) throw err;
          res.json({
            user: userData,
          });
        });
      }
      return res.status(302).json({
        msg: 'username is not avilable',
      });
    });
  },
  logIn: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(404).json({
          msg: 'Acount not available. Please Sign Up.',
        });
      }
      return req.logIn(user, (error) => {
        if (error) return next(error);
        return User.findOne({ _id: user._id }, { password: 0 }, (e, data) => {
          if (e) throw err;
          return res.json({
            user: data,
          });
        });
      });
    })(req, res, next);
  },
  isLoggedIn: (req, res) => {
    console.log(req.user, "in is loggediN")
    const {username, _id} = req.user;
    User.findOne({ _id: username ? req.user._id : req.user.data._id }, { password: 0 }, (err, data) => {
      if (err) throw err;
      if(!data) {
        return res.status(401).json({
          msg: 'You are not logged in.',
        });
      }
      return res.json({
        user: data,
      });
    });
  },
  logOut: (req, res) => {
    req.session.destroy(function(e){
      req.logout();
      // res.redirect('/');
      res.status(200).json({
        msg: 'Logout Completed',
      });
    });
  },
};
