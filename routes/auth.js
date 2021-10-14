
const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  registerUser
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/registerUser").post(registerUser);

module.exports = router;