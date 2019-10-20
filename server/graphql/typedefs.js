const { gql } = require("apollo-server-express");

// directive @formatDate(
//   defaultFormat: String = "mm dd yyyy"
// ) on FIELD_DEFINITION

// directive @authenticated on FIELD_DEFINITION

// directive @authorized(role: Role!) on FIELD_DEFINITION
module.exports = gql`
	type User {
		username: String!
		email: String!
		fullName: String!
		todos: [Todo]!
	}

	type Todo: {
		user: User!
		todo: String!
		done: Boolean!
	}
`;
