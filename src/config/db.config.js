const mongoose = require("mongoose");
const { MONGODB_URI } = require("./server.config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("Error Connecting To MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
