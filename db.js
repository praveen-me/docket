const db = require("./db.config");

module.exports = {
  userController: require("./server/controllers/user.controller")(db),
  todoController: require("./server/controllers/todo.controller")(db)
};
