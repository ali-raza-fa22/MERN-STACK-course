import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("books")
      .aggregate([
        {
          $group: {
            _id: null,
            averagePrice: { $avg: "$price" },
          },
        },
      ])
      .toArray();

    console.log("✅ Average price of all books:");
    if (result.length > 0) {
      console.log(`Average Price: $${result[0].averagePrice.toFixed(2)}`);
    } else {
      console.log("No books found");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
