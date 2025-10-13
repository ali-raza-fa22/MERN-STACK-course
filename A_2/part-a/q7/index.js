import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db.collection("books").createIndex({ title: 1 });
    console.log("✅ Created index on 'title' field of 'books' collection");
    console.log("Index name:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();