import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q17: Display only book titles and prices (projection)
async function displayBookTitlesAndPrices() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Using projection to fetch only title and price fields
    const books = await db
      .collection("books")
      .find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .toArray();

    console.log("✅ Books with titles and prices (projection)");
    console.log(`Total books found: ${books.length}\n`);

    if (books.length === 0) {
      console.log("No books found in the collection.");
    } else {
      console.log("Title\t\t\t\t\tPrice");
      console.log("─".repeat(60));
      books.forEach((book) => {
        const title = book.title.padEnd(40);
        console.log(`${title}\t$${book.price}`);
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
    await displayBookTitlesAndPrices();
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
