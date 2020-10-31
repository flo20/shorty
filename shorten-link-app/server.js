//Required
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //bodyparser middleware

//Initialize
const app = express();

// Middleware bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MongoDB keys
const db = require("./config/mongoKeys").mongoURI;

// Connecting to MongoDB
mongoose
  .connect(db)
  .then("connected", () => console.log("MongoDB connected"))
  .catch("error", (err) => console.log("Error connecting to database" + err));

//Routes
const shortLink = require("./routes/api/shortLink");
app.use("/api/short", shortLink);

//redirecting the path
const redirect = require("./routes/api/redirect");
app.use("/api/redirect", redirect);

//hash route
app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  //console.log(id);
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      res.redirect("http://" + doc.url);
    } else {
      console.log(err);
      res.status(400).json({ err: "Link has expired." });
      res.redirect("/");
    }
  });
});

//Listening path
app.get("/login", (req, res) => {
  res.send("Hi testing");
});

//Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
