const express = require("express");
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
const server = require("./server/graphql/config");

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
