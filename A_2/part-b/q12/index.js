import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q12: Find all books written by a specific author
async function findBooksByAuthor(author) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const books = await db.collection("books").find({ author }).toArray();

    console.log(`✅ Books by "${author}" found`);
    console.log(`Total books found: ${books.length}\n`);

    if (books.length === 0) {
      console.log(`No books found by author: "${author}"`);
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
    console.error("❌ Error finding books by author:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await findBooksByAuthor("F. Scott Fitzgerald");
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
