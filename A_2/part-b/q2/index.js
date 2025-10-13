import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q2: Function to insert a new book with fields (title, author, price, stock)
async function insertBook(title, author, price, stock) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const book = {
      title,
      author,
      price,
      stock,
      createdAt: new Date(),
    };

    const result = await db.collection("books").insertOne(book);

    console.log("✅ Book inserted successfully");
    console.log("Book ID:", result.insertedId);
    console.log("Book details:", book);

    return result.insertedId;
  } catch (error) {
    console.error("❌ Error inserting book:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await insertBook("The Great Gatsby", "F. Scott Fitzgerald", 10.99, 50);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
