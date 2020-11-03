const express = require("express");
const routers = express.Router();
const uniqid = require("../utils/genId");
const { UrlModel } = require("../models/urlSchema");

//loading URL
routers.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});

// Making GET request   /api/short/test
routers.get("/", async (req, res) => {
  const allUrl = await UrlModel.find().select("url uniqid -_id");

  res.send(allUrl);
});

// Making POST request /api/short
routers.post("/", async (req, res) => {
  let newDoc = await UrlModel.findOne({ url: req.body.url });
  if (newDoc) return res.status(400).send("This entry already exist");

  const myId = uniqid(6);

  newDoc = new UrlModel({
    linkId: myId,
    // url: req.body.url,
  });

  newDoc = await newDoc.save();

  res.send(req.body);
});

module.exports = routers;
