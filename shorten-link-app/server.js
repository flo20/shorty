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


//Listening path
app.get("/login", (req, res) => {
  res.send("Hi testing");
});

//Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
