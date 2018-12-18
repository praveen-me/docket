const express = require('express');
const router = express.Router();
const todo = require('./../controllers/todo.controller');

router.post('/todos', todo.inserTodo);