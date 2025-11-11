const express = require("express");
const protect = require("../middleware/protect");
const { createIncome } = require("../controllers/income.controller");
const router = express.Router();

router.use(protect);

router.post("/", createIncome);

module.exports = router;
