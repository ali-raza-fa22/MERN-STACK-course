import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q1: Connect with bookstoreDB using MongoDB Client
async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    console.log("✅ Connected to bookstoreDB");
    console.log("Database name:", db.databaseName);

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log("\nAvailable collections:");
    collections.forEach((col) => console.log(`  - ${col.name}`));
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

main();
