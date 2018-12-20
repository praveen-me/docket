const express = require('express');
const router = express.Router();
const todoController = require('./../controllers/todo.controller');
const userController = require('./../controllers/user.controller');
const auth = require('./../modules/auth');

router.post('/todos', auth.isLoggedIn,todoController.insertTodo);

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.get('/isLoggedIn', auth.isLoggedIn, userController.isLoggedIn);

router.delete('/todos/:id', auth.isLoggedIn, todoController.deleteTodo);

router.get('/todos', auth.isLoggedIn, todoController.getAllTodos);

router.get('/logout', auth.isLoggedIn, userController.logOut)

// router.put('/todos/:id')

module.exports = router;