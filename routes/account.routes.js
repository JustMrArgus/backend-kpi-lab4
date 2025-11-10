const express = require("express");
const { getAccountByUserId } = require("../controllers/account.controller");
const router = express.Router();

router.get("/:userId", getAccountByUserId);

module.exports = router;
