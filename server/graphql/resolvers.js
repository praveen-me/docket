const userController = require("./../controllers/user.controller");
const { signUp, logIn } = userController;

module.exports = {
  Query: {
    me() {
      return {
        username: "mnjh"
      };
    }
  },
  Mutation: {
    signup: async (_, { input }, ___) => {
      return await signUp(input);
    },
    signin: async (_, { input }, ctx) => {
      return await logIn(input, ctx);
    }
  }
};
