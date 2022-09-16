const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
require("./db/connectDB");

//Routes
const userRoutes = require("./app/routes/userRoutes");

//Models
const User = require("./app/models/UserSchema");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let baseUrl = process.env.BASE_URL;

app.use(`${baseUrl}/user`, userRoutes);

app.listen(process.env.DEV_PORT, () =>
  console.log(`Login app listening on DEV_PORT ${process.env.DEV_PORT}!`)
);
