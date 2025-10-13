import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db.collection("books").aggregate([
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    console.log("✅ Books count per author:");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();