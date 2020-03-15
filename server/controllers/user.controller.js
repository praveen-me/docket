const passport = require("passport");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

// module.exports = {
//   signUp: (req, res) => {
//     const newUser = new User({
//       ...req.body,
//     });

//     User.findOne({ username: req.body.username }, (err, data) => {
//       if (!data) {
//         return newUser.save((error, userData) => {
//           if (err) throw err;
//           res.status(201).json({
//             user: userData,
//           });
//         });
//       }
// return res.status(302).json({
//   msg: 'username is not available',
// });
//     });
//   },
//   logIn: (req, res, next) => {
// passport.authenticate('local', (err, user) => {
//   if (err) return next(err);
//   if (!user) {
//     return res.status(404).json({
//       msg: 'Account not available. Please Sign Up.',
//     });
//   }
//   return req.logIn(user, (error) => {
//     if (error) return next(error);
//     return User.findOne({ _id: user._id }, { password: 0 }, (e, data) => {
//       if (e) throw err;
//       return res.json({
//         user: data,
//         token: jwt.sign({user: data}, 'secret')
//       });
//     });
//   });
// })(req, res, next);
//   },
// isLoggedIn: (req, res) => {
//   if(req.user) {
//     const {username, _id} = req.user;
//     User.findOne({ _id: username ? req.user._id : req.user.data._id }, { password: 0 }, (err, data) => {
//       if (err) throw err;
//       if(!data) {
//         return res.status(401).json({
//           msg: 'You are not logged in.',
//         });
//       }
//       return res.json({
//         user: data
//       });
//     });
//   } else {
//     return res.status(401).json({
//       msg: 'You are not logged in.',
//     });
//   }
// },
//   logOut: (req, res) => {
//     req.session.destroy(function(e){
//       req.logout();
//       // res.redirect('/');
//       res.status(200).json({
//         msg: 'Logout Completed',
//       });
//     });
//   },
//   callbackGoogle : passport.authenticate("google", {  failureRedirect: "/", session : true }),
//   function(req, res) {
//     res.redirect('/');
//   }
// };

module.exports = db => {
  const signUp = async userCreds => {
    const { username, password, email } = userCreds;

    const result = await db.tx(async t => {
      await t.none(
        `
        INSERT INTO users( username, password, email) 
        VALUES ($1, $2, $3)
      `,
        [username, password, email]
      );

      return await t.one(
        `
        SELECT username, email FROM users WHERE username=$1;
      `,
        [username]
      );
    });
    return result;
  };

  const verifyUser = async (username, cb) => {
    const result = await db.oneOrNone(
      `
      SELECT * FROM users WHERE username=$1 OR email=$1;
    `,
      [username]
    );

    cb(result);
  };

  return {
    signUp,
    verifyUser
  };
};
