import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q9: Update the stock quantity of a book
async function updateBookStock(title, newStock) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("books")
      .updateOne(
        { title },
        { $set: { stock: newStock, updatedAt: new Date() } }
      );

    if (result.matchedCount > 0) {
      console.log("✅ Book stock updated successfully");
      console.log(`  Matched: ${result.matchedCount} document(s)`);
      console.log(`  Modified: ${result.modifiedCount} document(s)`);
      console.log(`  Title: "${title}"`);
      console.log(`  New Stock: ${newStock} units`);
    } else {
      console.log(`❌ No book found with title: "${title}"`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error updating book stock:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await updateBookStock("The Great Gatsby", 75);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
