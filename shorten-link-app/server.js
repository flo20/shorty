const express = require("express");
const bodyParser = require("body-parser");
const shortLink = require("./routes/shortLink");
const redirect = require("./routes/redirect");
const path = require("path");
require("./startup/db")();

const app = express(); //Initialize

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/links", shortLink);
app.use("/", redirect);

//Production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Port
const port = process.env.PORT;

app.listen(port, () => console.log(`Running on port ${port}`));
