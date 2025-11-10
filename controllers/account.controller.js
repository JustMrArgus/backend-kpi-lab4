const prisma = require("../prisma/client");

const getAccountByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const account = await prisma.account.findUnique({
      where: { userId: userId },
    });

    if (!account) {
      return res.status(404).json({ error: "Account not found for this user" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch account" });
  }
};

module.exports = {
  getAccountByUserId,
};
