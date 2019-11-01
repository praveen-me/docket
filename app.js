const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const cors = require("cors");
const server = require("./server/graphql/config");

require("dotenv").config();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));

if (process.env.NODE_ENV === "production") {
  app.use("/dist", express.static(path.join(__dirname, "dist/")));
} else {
  app.use("/static", express.static(path.join(__dirname, "static/")));
}

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

app.use(cors());
app.options("*", cors());
// Essential Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./server/modules/passport")(passport);

server.applyMiddleware({ app });

// Requiring routes
app.use(require("./server/routers/index"));

app.listen(8001, () => {
  console.log("Server is running on http://localhost:8001");
});
