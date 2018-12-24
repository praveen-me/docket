const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username : {type : String, default : ''},
  password : {type : String, default : ''},
  gID : {type : String, default : ''},
  email : String,
  fullName : String,
  todos : [{
    type : mongoose.Schema.Types.ObjectId, ref : 'Todo'
  }]
});

// takes user current password, hash it.
userSchema.pre('save', function(next) {
  const password = this.password;

  if(this.isModified(password)) return next();

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if(err) throw err;
    this.password = hash;
    next();
  });
});

/*
 * validPasword() takes userpassword and compare with
 * the password hash of the particular user
 * return false if fails, whole user if pass 
 */
userSchema.methods.validPassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, res) {
    if(err) cb(err, false);
    cb(null, res);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;