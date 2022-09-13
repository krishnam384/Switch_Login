const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

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

app.listen(process.env.DEV_PORT, () =>
  console.log(`Login app listening on DEV_PORT ${process.env.DEV_PORT}!`)
);

console.log("Welcome to Develop!");
