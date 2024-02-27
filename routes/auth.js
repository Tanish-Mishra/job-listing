const express = require("express");
const Router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/registerController");

Router.post("/login", loginUser);
Router.post("/register", registerUser);

module.exports = Router;
