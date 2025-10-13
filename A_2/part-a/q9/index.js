import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const emailToDelete = "ahmed@example.com"; // Replace with actual email

    const result = await db
      .collection("customers")
      .deleteOne({ email: emailToDelete });

    console.log(
      `✅ Deleted ${result.deletedCount} customer(s) with email: ${emailToDelete}`
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
