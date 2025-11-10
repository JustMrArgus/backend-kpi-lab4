const prisma = require("../prisma/client");

const createUser = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        account: {
          create: { balance: 0 },
        },
      },
      include: {
        account: true,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
};

const getUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User is not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User is not found" });
    }
    res.status(500).json({ error: "Could not delete user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
};
