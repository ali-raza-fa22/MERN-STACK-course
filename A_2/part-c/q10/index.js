import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Order } from "../q3/index.js";
// Import Customer model to register it with Mongoose for population
import { Customer } from "../q2/index.js";

async function Q10() {
  try {
    await connectToDatabase();

    // Fetch all orders with populated customer details
    const orders = await Order.find().populate("customer").exec();

    console.log("📋 Orders with customer details:");
    console.log(`Found ${orders.length} orders:`);

    orders.forEach((order, index) => {
      console.log(`\n--- Order ${index + 1} ---`);
      console.log(`Order ID: ${order._id}`);
      console.log(`Quantity: ${order.quantity}`);
      console.log(`Order Date: ${order.orderDate}`);
      console.log(
        `Customer: ${order.customer ? order.customer.name : "Not found"}`
      );
      console.log(
        `Customer Email: ${order.customer ? order.customer.email : "Not found"}`
      );
      console.log(
        `Customer Address: ${
          order.customer ? order.customer.address : "Not found"
        }`
      );
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error fetching orders with customer details:", error);
    process.exit(1);
  }
}

Q10();
