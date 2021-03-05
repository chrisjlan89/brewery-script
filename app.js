const express = require("express");
const routes = require("./routes/router");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

const port = 4002;

app.use(routes);
app.listen(port, () => console.log(`http://localhost:${port}/sillyGoose`));
module.exports = app;
