import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Design the bookstoreDB database with books, customers, and orders collections
    await db.createCollection("books");
    console.log("✅ Created 'books' collection");

    await db.createCollection("customers");
    console.log("✅ Created 'customers' collection");

    await db.createCollection("orders");
    console.log("✅ Created 'orders' collection");

    console.log(
      "✅ Database designed with collections: books, customers, orders"
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
