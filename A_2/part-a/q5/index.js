import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const books = await db
      .collection("books")
      .find({ price: { $gt: 30 } })
      .toArray();
    console.log("✅ Books priced above 30:");
    console.log(books);
    console.log(`Total books found: ${books.length}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
