const express = require("express");
const mongoose = require("mongoose");
const app = express(); //Initialize

require("./startup/db")();
require("./startup/routes")(app);

//Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
