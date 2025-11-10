const prisma = require("../prisma/client");

const createIncome = async (req, res) => {
  const { userId, amount } = req.body;

  if (userId === undefined || amount === undefined) {
    return res.status(400).json({ error: "userId and amount are required" });
  }

  const parsedUserId = parseInt(userId, 10);
  const parsedAmount = parseFloat(amount);

  if (parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  try {
    const [newIncome, updatedAccount] = await prisma.$transaction([
      prisma.income.create({
        data: {
          amount: parsedAmount,
          userId: parsedUserId,
        },
      }),
      prisma.account.update({
        where: { userId: parsedUserId },
        data: {
          balance: { increment: parsedAmount },
        },
      }),
    ]);

    res.status(201).json({ newIncome, newBalance: updatedAccount.balance });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User or user account not found" });
    }
    res.status(500).json({ error: "Could not add income" });
  }
};

module.exports = {
  createIncome,
};
