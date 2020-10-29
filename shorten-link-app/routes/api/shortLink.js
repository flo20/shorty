const express = require("express");
const routers = express.Router();
const uniqueId = require("uniqid");

// urlSchema
//const URL = require("./models/urlSchema");

// Making GET request   /api/short/test
routers.get("/test", (req, res) => res.json({ message: "API is working" }));

// Making POST request /api/short
routers.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log("URL is: ", urlData);
});

module.exports = routers;
