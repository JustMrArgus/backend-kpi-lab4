const prisma = require("../prisma/client");
const createAndSendToken = require("../utils/createAndSendToken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    createAndSendToken(newUser, 201, res);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({
      status: "fail",
      message: "Error creating user.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password!",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password.",
      });
    }

    createAndSendToken(user, 200, res);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong during login.",
    });
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
  signup,
  login,
  getUsers,
  getUser,
  deleteUser,
};
