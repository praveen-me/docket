const express = require('express');

const router = express.Router();
const todoController = require('./../controllers/todo.controller');
const userController = require('./../controllers/user.controller');
const auth = require('./../modules/auth');
const passport = require('passport');

router.post('/todos', auth.isLoggedIn, todoController.insertTodo);

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.get('/isLoggedIn', auth.isLoggedIn, userController.isLoggedIn);

router.delete('/todos/:id', auth.isLoggedIn, todoController.deleteTodo);

router.get('/todos', auth.isLoggedIn, todoController.getAllTodos);

router.get('/logout', auth.isLoggedIn, userController.logOut);

router.get('/login/google', 
  passport.authenticate('google', { scope: ["profile", "email"] })
)

router.get("/google/callback", passport.authenticate("google", {  failureRedirect: "/", session : true }),
function(req, res) {
  console.log(req.session.cookie);
  res.redirect('/');
});

router.get('/login/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login',  session : true  }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.profile);
    res.redirect('/');
  });

module.exports = router;
