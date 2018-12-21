const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  todo: String,
  done: { type: Boolean, default: false },
});

const Todo = new mongoose.model('Todo', todoSchema);

module.exports = Todo;
