const { Router } = require("express");

const { checkServerHealth } = require("../controllers/healthcheck.controller");

const router = Router();

router.get("/", checkServerHealth);

module.exports = router;
