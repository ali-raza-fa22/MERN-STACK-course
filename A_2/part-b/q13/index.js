import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q13: Count total number of documents in books collection
async function countTotalBooks() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const count = await db.collection("books").countDocuments();

    console.log("✅ Books counted successfully");
    console.log(`Total number of books in collection: ${count}`);

    return count;
  } catch (error) {
    console.error("❌ Error counting books:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await countTotalBooks();
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
