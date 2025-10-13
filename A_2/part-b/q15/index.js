import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q15: Insert multiple books at once
async function insertMultipleBooks(booksArray) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Add createdAt timestamp to all books
    const booksWithTimestamp = booksArray.map((book) => ({
      ...book,
      createdAt: new Date(),
    }));

    const result = await db.collection("books").insertMany(booksWithTimestamp);

    console.log("✅ Multiple books inserted successfully");
    console.log(`  Inserted: ${result.insertedCount} document(s)`);
    console.log("\nInserted Book IDs:");
    Object.entries(result.insertedIds).forEach(([index, id]) => {
      console.log(
        `  ${parseInt(index) + 1}. ${
          booksWithTimestamp[index].title
        } - ID: ${id}`
      );
    });

    return result;
  } catch (error) {
    console.error("❌ Error inserting multiple books:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    const books = [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 14.99,
        stock: 30,
      },
      {
        title: "1984",
        author: "George Orwell",
        price: 13.99,
        stock: 45,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 11.99,
        stock: 25,
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 12.99,
        stock: 20,
      },
    ];

    await insertMultipleBooks(books);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
