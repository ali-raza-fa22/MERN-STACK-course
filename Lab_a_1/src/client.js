import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB connection configuration
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Lab_a_2";

// Create connection function
export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("Error during MongoDB disconnection:", err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
