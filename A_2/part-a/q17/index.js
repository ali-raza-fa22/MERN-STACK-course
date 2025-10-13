import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const books = await db
      .collection("books")
      .find({ stock: { $lt: 10 } })
      .toArray();

    console.log("✅ Books where stock is less than 10:");
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
