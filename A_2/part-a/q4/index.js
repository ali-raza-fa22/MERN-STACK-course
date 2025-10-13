import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const customerId = "68e74ea9d0423542c7a5e35f";
    const book1Id = "68e74e6793171f25af092247";
    const book2Id = "68e74e6793171f25af092248";

    const order = {
      customerId: customerId,
      books: [
        { bookId: book1Id, quantity: 2, price: 15.99 },
        { bookId: book2Id, quantity: 1, price: 12.99 },
      ],
      total: 2 * 15.99 + 1 * 12.99,
      orderDate: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);
    console.log("✅ Inserted order into the 'orders' collection");
    console.log("Order ID:", result.insertedId);
    console.log("Order details:", order);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
