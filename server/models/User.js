const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gitId: { type: String, default: "" },
  gId: { type: String, default: "" },
  fullName: { type: String, default: "", required: true },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

// takes user current password, hash it.
userSchema.pre("save", function(next) {
  const password = this.password;

  if (this.isModified(password)) return next();

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});

/*
 * validPasword() takes userpassword and compare with
 * the password hash of the particular user
 * return false if fails, whole user if pass
 */
userSchema.methods.validPassword = async function(userPassword) {
  const isValidPassword = bcrypt.compareSync(userPassword, this.password);

  if (!isValidPassword) {
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
