const { application } = require("express");
const express = require("express");
const router = express.Router();
//controllers
const userController = require("../controllers/userControllers");

router.get("/all", userController.getAllUsers);

router.post("/signup", userController.postSignupUser);

router.post("/login", userController.postLoginUser);

module.exports = router;
