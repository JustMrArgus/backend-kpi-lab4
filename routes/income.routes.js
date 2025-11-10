const express = require("express");
const { createIncome } = require("../controllers/income.controller");
const router = express.Router();

router.post("/", createIncome);

module.exports = router;
