const express = require("express");
const userRoutes = require("./user.routes");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use("/users", userRoutes);

router.get("/private", verifyToken, (req, res, next) => {
  return res.status(200).json({ message: "This Is Private Route." });
});

module.exports = router;
