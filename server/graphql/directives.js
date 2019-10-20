const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.currentUser) {
        throw new AuthenticationError("Not Authenticated");
      }

      return resolve(root, args, ctx, info);
    };
  }

  visitObject(type) {}

  authenticate(objectType) {}
}

module.exports = {
  AuthenticationDirective
};
