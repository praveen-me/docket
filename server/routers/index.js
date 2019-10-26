const express = require("express");
const router = express.Router();
let defaultPath = "/static";

if (process.env.NODE_ENV === "production") {
  defaultPath = "/dist";
}

router.get("*", (req, res) => {
  res.render("index", {
    path: defaultPath
  });
});

module.exports = router;
