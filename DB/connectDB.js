const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Switch", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection Established..!!"))
  .catch((error) => console.log("Error:", error));

console.log("Helloo");
