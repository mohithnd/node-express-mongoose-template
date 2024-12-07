const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server.config");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No Token Provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.user = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
