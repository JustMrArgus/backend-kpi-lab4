const prisma = require("../prisma/client");

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Category name already exists" });
    }
    res.status(500).json({ error: "Could not create category" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch categories" });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Could not delete category" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
