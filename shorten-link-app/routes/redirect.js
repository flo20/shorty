const express = require("express");
const routers = express.Router();

// Making a redirect   /api/short/test
routers.get("/test", (req, res) => res.json({ message: "API is working" }));

//headers hash
//Redirect user
//access Public

routers.get("/", (req, res) => {
  const hash = req.headers.hash;
  URL.findOne({ _id: hash })
    .then((doc) => {
      return res.json({ url: doc.url });
    })
    .catch((err) => {
      return res.status(400).json({ err: "Link has expired." });
    });
});

module.exports = routers;
