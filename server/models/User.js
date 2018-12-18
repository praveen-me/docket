const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  fullName : String,
  todos : [{
    type : mongoose.Schema.Types.ObjectId, ref : 'Todo'
  }]
})

// Hash the password before save
userSchema.pre('save', function(next) {
  const password = this.password;

  if(this.isModified(password)) return next();

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if(err) throw err;
    this.password = hash;
    next();
  })
})

userSchema.methods.validPassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, res) {
    if(err) cb(err, false)
    cb(null, res)
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;