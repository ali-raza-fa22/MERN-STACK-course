import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q18: Sort all books by price in descending order
async function sortBooksByPriceDescending() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Sort by price in descending order (-1)
    const books = await db
      .collection("books")
      .find({})
      .sort({ price: -1 })
      .toArray();

    console.log("✅ Books sorted by price (descending order)");
    console.log(`Total books found: ${books.length}\n`);

    if (books.length === 0) {
      console.log("No books found in the collection.");
    } else {
      books.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title}`);
        console.log(`   Author: ${book.author}`);
        console.log(`   Price: $${book.price}`);
        console.log(`   Stock: ${book.stock}`);
        console.log("---");
      });
    }

    return books;
  } catch (error) {
    console.error("❌ Error fetching and sorting books:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await sortBooksByPriceDescending();
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
