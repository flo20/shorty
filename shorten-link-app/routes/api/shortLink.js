const express = require("express");
const routers = express.Router();
const uniqueId = require("uniqid");

// urlSchema
const URL = require("./../../models/urlSchema");

// Making GET request   /api/short/test
routers.get("/test", (req, res) => res.json({ message: "API is working" }));

// Making POST request /api/short
routers.post("/", (req, res) => {
  console.log(req.body);
  //checking if user got the request
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log("URL is: ", urlData);

  //checking if the URL already exists
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("This entry already exists");
    } else {
      console.log("This is a new URL");
      const address = new URL({
        _id: uniqueId(),
        url: urlData,
      });
        // Saving the data
        address.save((err) => {
            if (err) {
                return console.log(err);
            } res.send({
                url: urlData,
                hash: address._id,
                status: 200,
                statusTxt:"OK"
            })
        })
    }
  });
});

module.exports = routers;
