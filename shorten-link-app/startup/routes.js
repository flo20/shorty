const express = require("express");
const bodyParser = require("body-parser");
const shortLink = require("../routes/shortLink");
const redirect = require("../routes/redirect");
const path = require("path");

module.exports = function (app) {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //routes
  app.use("/links", shortLink);
  app.use("/", redirect);

  // Serve static assets if in production
  if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    });
  }
};
