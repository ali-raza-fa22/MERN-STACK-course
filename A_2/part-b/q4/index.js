import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q4: Function to insert a new order in the orders collection
async function insertOrder(customerId, books, total) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const order = {
      customerId,
      books, // Array of { bookId, quantity, price }
      total,
      orderDate: new Date(),
      status: "pending",
    };

    const result = await db.collection("orders").insertOne(order);

    console.log("✅ Order inserted successfully");
    console.log("Order ID:", result.insertedId);
    console.log("Order details:", order);

    return result.insertedId;
  } catch (error) {
    console.error("❌ Error inserting order:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    // Replace these with actual IDs from your database
    const customerId = "68e74ea9d0423542c7a5e35f";
    const book1Id = "68e74e6793171f25af092247";
    const book2Id = "68e74e6793171f25af092248";

    const books = [
      { bookId: book1Id, quantity: 2, price: 15.99 },
      { bookId: book2Id, quantity: 1, price: 12.99 },
    ];

    const total = books.reduce(
      (sum, book) => sum + book.quantity * book.price,
      0
    );

    await insertOrder(customerId, books, total);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
