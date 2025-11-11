const { Router } = require("express");

const protect = require("../middleware/protect");

const { getUsers } = require("../controllers/user.controller");

const router = Router();

router.use(protect);

router.get("/", getUsers);

module.exports = router;
