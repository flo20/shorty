const express = require("express");
const app = express(); //Initialize
require("./config/db")(); //calling database
require("./startup/routes")(app); // initializing routes

//Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
