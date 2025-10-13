import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q19: Find all books within a price range
async function findBooksInPriceRange(minPrice, maxPrice) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Query books within the price range using $gte and $lte
    const books = await db
      .collection("books")
      .find({
        price: { $gte: minPrice, $lte: maxPrice },
      })
      .toArray();

    console.log(
      `✅ Books found within price range $${minPrice} - $${maxPrice}`
    );
    console.log(`Total books found: ${books.length}\n`);

    if (books.length === 0) {
      console.log(
        `No books found in the price range $${minPrice} - $${maxPrice}`
      );
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
    console.error("❌ Error finding books in price range:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await findBooksInPriceRange(10, 15);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
