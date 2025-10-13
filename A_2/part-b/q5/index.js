import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q5: Fetch all books and display them in the console
async function fetchAllBooks() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const books = await db.collection("books").find({}).toArray();

    console.log("✅ Fetched all books successfully");
    console.log(`Total books found: ${books.length}\n`);

    if (books.length === 0) {
      console.log("No books found in the collection.");
    } else {
      books.forEach((book, index) => {
        console.log(`Book ${index + 1}:`);
        console.log(`  ID: ${book._id}`);
        console.log(`  Title: ${book.title}`);
        console.log(`  Author: ${book.author}`);
        console.log(`  Price: $${book.price}`);
        console.log(`  Stock: ${book.stock}`);
        console.log("---");
      });
    }

    return books;
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await fetchAllBooks();
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
