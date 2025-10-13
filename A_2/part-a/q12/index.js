import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orders = await db
      .collection("orders")
      .find({
        orderDate: { $gte: sevenDaysAgo },
      })
      .toArray();

    console.log("✅ Orders placed in the last 7 days:");
    console.log(orders);
    console.log(`Total orders: ${orders.length}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
