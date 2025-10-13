import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q7: Find one book by its title
async function findBookByTitle(title) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const book = await db.collection("books").findOne({ title });

    if (book) {
      console.log("✅ Book found successfully");
      console.log(`  ID: ${book._id}`);
      console.log(`  Title: ${book.title}`);
      console.log(`  Author: ${book.author}`);
      console.log(`  Price: $${book.price}`);
      console.log(`  Stock: ${book.stock}`);
    } else {
      console.log(`❌ No book found with title: "${title}"`);
    }

    return book;
  } catch (error) {
    console.error("❌ Error finding book:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await findBookByTitle("The Great Gatsby");
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
