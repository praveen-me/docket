const express = require("express");
const auth = require("./../modules/auth");

module.exports = todoController => {
  const router = express.Router();

  router.get("/todos", auth.isLoggedIn, async (req, res) => {
    const todos = await todoController.getAllTodos(req.user.id);

    res.json({
      data: todos
    });
  });

  router.post("/todos", auth.isLoggedIn, async (req, res) => {
    const { body, user } = req;

    const todos = await todoController.inserTodo(user.id, body);

    res.json({
      data: todos
    });
  });

  router.delete("/todos/:id", auth.isLoggedIn, async (req, res) => {
    const {id} = req.params

    const data = await todoController.deleteTodo(id, req.user.id)
    
    res.json({data})
  });
  return router;
};
