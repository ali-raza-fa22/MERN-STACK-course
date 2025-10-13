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
          $group: {
            _id: "$customerId",
            totalRevenue: { $sum: "$total" },
          },
        },
      ])
      .toArray();

    console.log("✅ Total revenue grouped by customer:");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
