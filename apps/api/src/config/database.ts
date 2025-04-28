import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  try {
    const url = process.env.MONGODB_URL || "mongodb://localhost:27017/task-manager";
    await mongoose.connect(url);
    console.log("Connected to MongoDB Atlas (via Mongoose)");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
