const userController = require("./../controllers/user.controller");
const todoController = require("./../controllers/todo.controller");
const { signUp, logIn } = userController;
const { insertTodo } = todoController;

module.exports = {
  Query: {
    me(_, __, ctx) {
      return {
        ...ctx.currentUser
      };
    }
  },
  Mutation: {
    signup: async (_, { input }, ___) => {
      return await signUp(input);
    },
    signin: async (_, { input }, ctx) => {
      return await logIn(input, ctx);
    },
    addTodo: async (_, { input }) => {
      return await insertTodo(input);
    }
  }
};
