const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  fullName : String,
  todos : [{
    type : mongoose.Schema.Types.ObjectId, ref : 'Todo'
  }]
})

const User = new mongoose.model('User', userSchema);

module.exports = User;