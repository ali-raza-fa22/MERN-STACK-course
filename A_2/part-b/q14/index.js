import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q14: Find all orders of a given customer
async function findOrdersByCustomer(customerId) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const orders = await db.collection("orders").find({ customerId }).toArray();

    console.log(`✅ Orders for customer ID "${customerId}" found`);
    console.log(`Total orders found: ${orders.length}\n`);

    if (orders.length === 0) {
      console.log(`No orders found for customer ID: "${customerId}"`);
    } else {
      orders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`);
        console.log(`  Order ID: ${order._id}`);
        console.log(`  Customer ID: ${order.customerId}`);
        console.log(`  Total: $${order.total}`);
        console.log(`  Order Date: ${order.orderDate}`);
        console.log(`  Status: ${order.status || "N/A"}`);
        console.log(`  Books:`);
        order.books.forEach((book, idx) => {
          console.log(
            `    ${idx + 1}. Book ID: ${book.bookId}, Quantity: ${
              book.quantity
            }, Price: $${book.price}`
          );
        });
        console.log("---");
      });
    }

    return orders;
  } catch (error) {
    console.error("❌ Error finding orders:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    // Replace with actual customer ID from your database
    await findOrdersByCustomer("68e74ea9d0423542c7a5e35f");
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
