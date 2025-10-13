import mongoose from "mongoose";
import { connectToDatabase } from "../../client.js";
import { Book } from "../q1/index.js";

async function Q16() {
  try {
    await connectToDatabase();

    // Query to list all books priced above 40
    const books = await Book.find({ price: { $gt: 40 } });

    console.log("📚 Books priced above $40:");
    console.log(`Found ${books.length} books:`);

    if (books.length === 0) {
      console.log("   No books found with price > $40");
    } else {
      books.forEach((book, index) => {
        console.log(`\n--- Book ${index + 1} ---`);
        console.log(`Title: ${book.title}`);
        console.log(`Author: ${book.author}`);
        console.log(`Price: $${book.price}`);
        console.log(`Stock: ${book.stock}`);
      });
    }

    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error fetching books priced above 40:", error);
    process.exit(1);
  }
}

Q16();
