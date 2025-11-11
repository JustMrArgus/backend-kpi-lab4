const { Router } = require("express");
const protect = require("../middleware/protect");

const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.use(protect);

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
