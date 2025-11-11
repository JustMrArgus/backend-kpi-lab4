const express = require("express");
const { getAccountByUserId } = require("../controllers/account.controller");
const protect = require("../middleware/protect");
const router = express.Router();

router.use(protect);

router.get("/:userId", getAccountByUserId);

module.exports = router;
