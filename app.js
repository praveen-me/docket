const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const server = require("./server/graphql/config");
const webpackSetup = require("./webpack-setup");
const PORT = 4000;

require("dotenv").config();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));

if (process.env.NODE_ENV === "production") {
  app.use("/dist", express.static(path.join(__dirname, "dist/")));
} else {
  app.use("/static", express.static(path.join(__dirname, "static/")));
  webpackSetup(app);
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

app.use(cors());
app.options("*", cors());
// Essential Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./server/modules/passport")(passport);

server.applyMiddleware({ app });

// Requiring routes
app.use(require("./server/routers/index"));

app.listen(PORT, () => {
  console.log(
    "Server is running on http://localhost:" + PORT + server.graphqlPath
  );
});
