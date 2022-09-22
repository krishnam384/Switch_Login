const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("config");
require("dotenv").config();
require("./db/connectDB");

//Routes
const userRoutes = require("./app/routes/userRoutes");

//Models
const User = require("./app/models/UserSchema");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL_ERROR: SECRET KEY NOT FOUND");
  process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let baseUrl = process.env.BASE_URL;

app.use(`${baseUrl}/user`, userRoutes);

app.listen(process.env.DEV_PORT, () =>
  console.log(`Login app listening on DEV_PORT ${process.env.DEV_PORT}!`)
);
