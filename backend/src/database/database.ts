import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbURL = process.env.MONGODB_URL;

const connectDatabase = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.MONGODB_URL ?? "");

    if (connectDb) {
      console.log("Database connected successfully");
    } else {
      console.log("Failed to connect with database");
    }
  } catch (error) {
    console.log("Something went wrong. Failed to connect with database", error);
  }
};
