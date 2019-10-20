const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoConnect = require("connect-mongo")(session);
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const cors = require("cors");

const typeDefs = gql`
  directive @formatDate(
    defaultFormat: String = "mm dd yyyy"
  ) on FIELD_DEFINITION

  directive @authenticated on FIELD_DEFINITION

  directive @authorized(role: Role!) on FIELD_DEFINITION

  enum Theme {
    DARK
    LIGHT
  }

  enum Role {
    ADMIN
    MEMBER
    GUEST
  }

  type User {
    id: ID!
    email: String!
    avatar: String!
    verified: Boolean!
    createdAt: String! @formatDate
    posts: [Post]!
    role: Role!
    settings: Settings!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  type Post {
    id: ID!
    message: String!
    author: User!
    createdAt: String!
    likes: Int!
    views: Int!
  }

  type Settings {
    id: ID!
    user: User!
    theme: Theme!
    emailNotifications: Boolean!
    pushNotifications: Boolean!
  }

  type Invite {
    email: String!
    from: User!
    createdAt: String!
    role: Role!
  }

  input NewPostInput {
    message: String!
  }

  input UpdateSettingsInput {
    theme: Theme
    emailNotifications: Boolean
    pushNotifications: Boolean
  }

  input UpdateUserInput {
    email: String
    avatar: String
    verified: Boolean
  }

  input InviteInput {
    email: String!
    role: Role!
  }

  input SignupInput {
    email: String!
    password: String!
    role: Role!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  type Query {
    me: User! @authenticated
    posts: [Post]!
    post(id: ID!): Post!
    userSettings: Settings!
    feed: [Post]!
  }

  type Mutation {
    updateSettings(input: UpdateSettingsInput!): Settings!
    createPost(input: NewPostInput!): Post!
    updateMe(input: UpdateUserInput!): User
    invite(input: InviteInput!): Invite! @authorized(role: ADMIN)
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
  }

  type Subscription {
    newPost: Post!
  }
`;

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },
    posts(_, __, { user, models }) {
      return models.Post.findMany({ author: user.id });
    },

    post(_, { id }, { user, models }) {
      return models.Post.findOne({ id, author: user.id });
    },

    userSettings(_, __, { user, models }) {
      return models.Settings.findOne({ user: user.id });
    },
    // public resolver
    feed(_, __, { models }) {
      return models.Post.findMany();
    }
  },
  Mutation: {
    updateSettings(_, { input }, { user, models }) {
      return models.Settings.updateOne({ user: user.id }, input);
    },

    createPost(_, { input }, { user, models }) {
      const post = models.Post.createOne({ ...input, author: user.id });
      pubSub.publish(NEW_POST, { newPost: post });
      return post;
    },

    updateMe(_, { input }, { user, models }) {
      return models.User.updateOne({ id: user.id }, input);
    },
    // admin role
    invite: (_, { input }, { user }) => {
      return {
        from: user,
        role: input.role,
        createdAt: Date.now(),
        email: input.email
      };
    },
    signup(_, { input }, { models, createToken }) {
      const existing = models.User.findOne({ email: input.email });

      if (existing) {
        throw new AuthenticationError("User Already Found.");
      }
      const user = models.User.createOne({
        ...input,
        verified: false,
        avatar: "http"
      });
      const token = createToken(user);
      return { token, user };
    },
    signin(_, { input }, { models, createToken }) {
      const user = models.User.findOne(input);

      if (!user) {
        throw new AuthenticationError("User Not Found");
      }

      const token = createToken(user);
      return { token, user };
    }
  },
  Subscription: {
    newPost: {
      subscribe: () => pubSub.asyncIterator([NEW_POST])
    }
  },
  User: {
    posts(root, _, { user, models }) {
      if (root.id !== user.id) {
        throw new Error("nope");
      }

      return models.Post.findMany({ author: root.id });
    },
    settings(root, __, { user, models }) {
      return models.Settings.findOne({ id: root.settings, user: user.id });
    }
  },
  Settings: {
    user(settings, _, { user, models }) {
      return models.Settings.findOne({ id: settings.id, user: user.id });
    }
  },
  Post: {
    author(post, _, { models }) {
      return models.User.findOne({ id: post.author });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

server.applyMiddleware({ app });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));

// Connecting To Mongodb
mongoose.connect(
  "mongodb://localhost/docket",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

// Webpack config
if (process.env.NODE_ENV === "development") {
  console.log("in webpack hot middleware");

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
}

app.use(
  session({
    secret: "docket session",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 360000
    },
    store: new MongoConnect({ url: "mongodb://localhost/docket-session" })
  })
);
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
app.use(passport.session());
require("./server/modules/passport")(passport);

// Essential Middleware
app.use(bodyParser.json());

// Requiring routes
app.use("/api", require("./server/routers/api"));
app.use(require("./server/routers/index"));

app.listen(8001, () => {
  console.log("Server is running on http://localhost:8001");
});
