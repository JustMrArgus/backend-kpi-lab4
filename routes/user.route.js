const { Router } = require("express");

const protect = require("../middleware/protect");

const {
  signup,
  login,
  getUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);

router.get("/:userId", getUser);
router.delete("/:userId", deleteUser);

module.exports = router;
