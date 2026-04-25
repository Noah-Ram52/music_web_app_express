const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Remember to set MONGODB_URI in your .env file write in READ ME
    await mongoose.connect(process.env.MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
