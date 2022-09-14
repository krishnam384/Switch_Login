const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
require("./DB/connectDB");
const User = require("./model/UserSchema");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post("/user/login", (req, res) => {
  const { username, password } = req.body;

  if (username == "Krishnam") {
    return res.status(200).json({
      message: `Welcome ${username}!`,
    });
  }
  return res.status(404).json({
    message: "User Not Found!",
  });
});

app.post("/user/signup", async (req, res) => {
  // const { username, password } = req.body;

  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(process.env.DEV_PORT, () =>
  console.log(`Login app listening on DEV_PORT ${process.env.DEV_PORT}!`)
);

console.log("Welcome to Develop!");
