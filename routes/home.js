const express = require("express");
const router = express.Router();

// Controllers
const {
    getAll,
    getItems,
    pay
} = require("../controllers/home");

router.route("/getAll").get(getAll);

router.route("/getItems/:id").get(getItems);

router.route("/pay/:id").post(pay);

module.exports = router;