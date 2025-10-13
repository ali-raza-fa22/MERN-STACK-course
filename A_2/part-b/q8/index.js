import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q8: Update the price of a book
async function updateBookPrice(title, newPrice) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("books")
      .updateOne(
        { title },
        { $set: { price: newPrice, updatedAt: new Date() } }
      );

    if (result.matchedCount > 0) {
      console.log("✅ Book price updated successfully");
      console.log(`  Matched: ${result.matchedCount} document(s)`);
      console.log(`  Modified: ${result.modifiedCount} document(s)`);
      console.log(`  Title: "${title}"`);
      console.log(`  New Price: $${newPrice}`);
    } else {
      console.log(`❌ No book found with title: "${title}"`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error updating book price:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await updateBookPrice("The Great Gatsby", 12.99);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
