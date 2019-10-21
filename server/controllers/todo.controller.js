const Todo = require("./../models/Todo");

module.exports = {
  insertTodo: async (todo, user) => {
    try {
      const newTodo = new Todo({
        user,
        todo
      });

      const currentTodo = await newTodo.save();
      return currentTodo;
    } catch (e) {
      throw new Error(e);
    }
  },
  deleteTodo: (req, res) => {
    console.log("delete");
    const { id } = req.params;
    Todo.remove({ _id: id }, () => {
      Todo.find({ user: req.user.data._id }, (err, data) => {
        res.json({
          data
        });
      });
    });
  },
  getAllTodos: async user => {
    try {
      const todos = await Todo.find({ user });

      return todos;
    } catch (e) {
      throw new Error(e);
    }
  }
};
