const userController = require("./../controllers/user.controller");
const todoController = require("./../controllers/todo.controller");
const { signUp, logIn, getUser } = userController;
const { insertTodo, getAllTodos, deleteTodo, changeTodoDone } = todoController;

module.exports = {
  Query: {
    me: async (_, __, ctx) => {
      if (!ctx.currentUser) {
        throw new Error("Token is wrong");
      }
      return await getUser(ctx.currentUser._id);
    },
    todos(_, __, ctx) {
      return getAllTodos(ctx.currentUser._id);
    }
  },
  Mutation: {
    signup: async (_, { input }, ___) => {
      return await signUp(input);
    },
    signin: async (_, { input }, ctx) => {
      return await logIn(input, ctx);
    },
    addTodo: async (_, { input }, ctx) => {
      return await insertTodo(input, ctx.currentUser._id);
    },
    deleteTodo: async (_, { id }, ___) => {
      return {
        isDeleted: await deleteTodo(id),
        _id: id
      };
    },
    toggleTodoDone: async (_, { input: { id, lastValue } }, ___) => {
      return await changeTodoDone(id, lastValue);
    }
  },
  Todo: {
    user: async (root, __, ctx) => {
      return await getUser(root.user);
    }
  },
  User: {
    todos: async (root, __, ___) => {
      return await getAllTodos(root._id);
    }
  }
};
