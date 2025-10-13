import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("orders")
      .aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $group: {
            _id: "$customer.city",
            orders: { $push: "$$ROOT" },
            totalOrders: { $sum: 1 },
          },
        },
      ])
      .toArray();

    console.log("✅ Orders grouped by city of the customer:");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
