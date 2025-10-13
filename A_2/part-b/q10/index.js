import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q10: Delete a book with a specific title
async function deleteBookByTitle(title) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db.collection("books").deleteOne({ title });

    if (result.deletedCount > 0) {
      console.log("✅ Book deleted successfully");
      console.log(`  Deleted: ${result.deletedCount} document(s)`);
      console.log(`  Title: "${title}"`);
    } else {
      console.log(`❌ No book found with title: "${title}"`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await deleteBookByTitle("The Great Gatsby");
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
