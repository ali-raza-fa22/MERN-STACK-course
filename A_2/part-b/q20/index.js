import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Q20: Reusable module that connects to MongoDB and exports the connection object

// Load environment variables
dotenv.config();

// MongoDB connection configuration
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookstoreDB";

let client = null;
let db = null;

/**
 * Connect to MongoDB and return the database connection
 * @returns {Promise<Object>} Database connection object
 */
export async function getConnection() {
  try {
    if (db && client) {
      // Return existing connection if already connected
      return { client, db };
    }

    // Create new MongoClient
    client = new MongoClient(MONGODB_URI);

    // Connect to MongoDB
    await client.connect();

    // Get database instance
    db = client.db();

    console.log("✅ Successfully connected to MongoDB");
    console.log(`Database: ${db.databaseName}`);

    // Handle process termination
    process.on("SIGINT", async () => {
      try {
        await closeConnection();
        process.exit(0);
      } catch (err) {
        console.error("Error during MongoDB disconnection:", err);
        process.exit(1);
      }
    });

    return { client, db };
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}

/**
 * Close MongoDB connection
 */
export async function closeConnection() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log("✅ MongoDB connection closed");
    }
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error);
    throw error;
  }
}

// Example usage demonstration
async function main() {
  try {
    // Get connection
    const { db } = await getConnection();

    // Perform database operations
    const collections = await db.listCollections().toArray();
    console.log("\nAvailable collections:");
    collections.forEach((col) => console.log(`  - ${col.name}`));

    // Count documents in books collection
    const booksCount = await db.collection("books").countDocuments();
    console.log(`\nTotal books: ${booksCount}`);
  } catch (error) {
    console.error("❌ Error in main:", error);
  } finally {
    await closeConnection();
  }
}

// Run example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
