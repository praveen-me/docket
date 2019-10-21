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
  deleteTodo: async _id => {
    try {
      const { deletedCount } = await Todo.deleteOne({ _id });

      return Boolean(deletedCount);
    } catch (e) {
      throw new Error(e);
    }
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
