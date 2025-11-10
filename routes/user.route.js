const { Router } = require("express");

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.post("/", createUser);
router.get("/:userId", getUser);
router.delete("/:userId", deleteUser);

module.exports = router;
