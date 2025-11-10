const { Router } = require("express");

const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
