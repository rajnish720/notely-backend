const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose connection logic
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };