const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/UserSchema");

const getAllUsers = async (req, res) => {
  const listOfUsers = await User.find();
  return res.status(200).json({
    message: "Users retrieved Successfully",
    users: [...listOfUsers],
  });
};

const postSignupUser = async (req, res) => {
  const { username, password } = req.body;
  const userFound = await User.findOne({
    username: username,
    password: password,
  });

  if (!userFound) {
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User Saved Successfully..!!",
      user: _.pick(savedUser, ["username", "_id"]),
    });
  }

  return res.status(400).json({
    message: "User already available",
  });
};

const postLoginUser = async (req, res) => {
  const userFound = await User.findOne({
    username: req.body.username,
  });

  if (!userFound) {
    return res.status(400).json({
      message: "Please Enter Valid Credentials..!!",
    });
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    userFound.password
  );

  if (!validPassword) {
    return res.status(400).json({
      message: "Please Enter Valid Password..!!",
    });
  }

  const token = User.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .status(200)
    .json({
      message: "User retrieved Successfully..!!",
      user: _.pick(userFound, ["username", "_id"]),
    });
};

module.exports = {
  getAllUsers: getAllUsers,
  postSignupUser: postSignupUser,
  postLoginUser: postLoginUser,
};
