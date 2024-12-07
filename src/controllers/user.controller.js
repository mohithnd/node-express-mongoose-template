const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server.config");
const {
  validateCreateUser,
  validateUpdateUser,
  validateLoginUser,
} = require("../validators/user.validator");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { error } = validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.json({ updatedUser });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    return res.json({ message: "User Deleted" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await userService.getUserByEmail(req.body.email);
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
