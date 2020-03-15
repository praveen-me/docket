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
const morgan = require("morgan");

const app = express();

const db = require("./db.js");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));

// Connecting To Mongodb
mongoose.connect(
  "mongodb://localhost/docket",
  { useNewUrlParser: true },
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
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

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
require("./server/modules/passport")(passport, db.userController);

// Essential Middleware
app.use(bodyParser.json());

// APIS
app.use("/api", require("./server/routers/user")(db.userController));
app.use("/api", require("./server/routers/todo")(db.todoController));

// Requiring routes
// app.use('/api', require('./server/routers/api'));
app.use(require("./server/routers/index"));

app.listen(8001, () => {
  console.log("Server is running on http://localhost:8001");
});
