const express = require('express');
const router = express.Router();
const todo = require('./../controllers/todo.controller');
const user = require('./../controllers/user.controller');

router.post('/todos', todo.inserTodo);

router.post('/signup', user.signUp);

router.post('/login', user.logIn);

router.get('/isLoggedIn', user.isLoggedIn);

router.delete('/todos/:id', todo.deleteTodo);

module.exports = router;