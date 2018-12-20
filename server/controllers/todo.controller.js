const Todo = require('./../models/Todo');

module.exports = {
  insertTodo : (req, res) => {
    const todoData = req.body;

    const newTodo = new Todo({
      user : todoData.userId,
      todo : todoData.todo,
    })

    newTodo.save((err, data) => {
      Todo.find({user : todoData.userId}, (err, data) => {
        res.json({
          data
        })
      })
    })
  },
  deleteTodo : (req, res) => {
    console.log("delete")
    if(!req.user) {
      return res.redirect('/')
    }

    const id = req.params.id;
    Todo.remove({_id : id}, (err, data) => {
      Todo.find({user : req.user._id}, (err, data) => {
        res.json({
          data
        })
      })
    })
  },
  getAllTodos : (req, res) => {
    Todo.find({user : req.user._id}, (err, data) => {
      res.json({
        data
      })
    })
  }
}