const express = require("express");
const router = express.Router();

// Controllers
const {
    getUser,
    addItem
} = require("../controllers/dashboard");

router.route("/getUser/:id").get(getUser);

router.route("/addItem/:id").post(addItem);

module.exports = router;