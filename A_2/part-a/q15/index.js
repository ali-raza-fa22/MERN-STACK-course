import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("customers")
      .aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders",
          },
        },
      ])
      .toArray();

    console.log("✅ Customers with their orders (joined):");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
