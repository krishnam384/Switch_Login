const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
