const Todo = require('./../models/Todo');

module.exports = {
  insertTodo: (req, res) => {
    const todoData = req.body;

    const newTodo = new Todo({
      user: todoData.userId,
      todo: todoData.todo,
    });

    newTodo.save(() => {
      Todo.find({ user: todoData.userId }, (err, data) => {
        res.json({
          data,
        });
      });
    });
  },
  deleteTodo: (req, res) => {
    console.log('delete');
    const { id } = req.params;
    Todo.remove({ _id: id }, () => {
      Todo.find({ user: req.user._id }, (err, data) => {
        res.json({
          data,
        });
      });
    });
  },
  getAllTodos: (req, res) => {
    Todo.find({ user: req.user._id }, (err, data) => {
      res.json({
        data,
      });
    });
  },
};
