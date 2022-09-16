const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection Established with DB..!!"))
  .catch((error) => console.log("Error:", error));
