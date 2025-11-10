const prisma = require("../prisma/client");

const createRecord = async (req, res) => {
  const { userId, categoryId, amount } = req.body;

  if (
    userId === undefined ||
    categoryId === undefined ||
    amount === undefined
  ) {
    return res
      .status(400)
      .json({ error: "userId, categoryId, and amount are required" });
  }

  const parsedUserId = parseInt(userId, 10);
  const parsedCategoryId = parseInt(categoryId, 10);
  const parsedAmount = parseFloat(amount);

  if (parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      include: { account: true },
    });
    const category = await prisma.category.findUnique({
      where: { id: parsedCategoryId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (!user.account) {
      return res.status(500).json({ error: "User account not found" });
    }

    if (user.account.balance < parsedAmount) {
      return res.status(400).json({
        error: "Insufficient funds",
        currentBalance: user.account.balance,
      });
    }

    const [newRecord, updatedAccount] = await prisma.$transaction([
      prisma.record.create({
        data: {
          amount: parsedAmount,
          userId: parsedUserId,
          categoryId: parsedCategoryId,
        },
      }),
      prisma.account.update({
        where: { userId: parsedUserId },
        data: {
          balance: { decrement: parsedAmount },
        },
      }),
    ]);

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: "Could not create record" });
  }
};

const getRecords = async (req, res) => {
  const { user_id, category_id } = req.query;

  if (!user_id && !category_id) {
    return res.status(400).json({
      error: "At least one filter (user_id or category_id) is required",
    });
  }

  const where = {};
  if (user_id) {
    where.userId = parseInt(user_id, 10);
  }
  if (category_id) {
    where.categoryId = parseInt(category_id, 10);
  }

  try {
    const records = await prisma.record.findMany({ where });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch records" });
  }
};

const getRecordById = async (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  try {
    const record = await prisma.record.findUnique({
      where: { id: recordId },
    });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch record" });
  }
};

const deleteRecord = async (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  try {
    await prisma.record.delete({
      where: { id: recordId },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(500).json({ error: "Could not delete record" });
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  deleteRecord,
};
