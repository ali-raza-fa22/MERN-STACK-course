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
          $unwind: "$books",
        },
        {
          $group: {
            _id: "$books.bookId",
            totalSold: { $sum: "$books.quantity" },
          },
        },
        {
          $sort: { totalSold: -1 },
        },
        {
          $limit: 3,
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        {
          $unwind: "$bookDetails",
        },
        {
          $project: {
            title: "$bookDetails.title",
            author: "$bookDetails.author",
            totalSold: 1,
          },
        },
      ])
      .toArray();

    console.log("✅ Top 3 best-selling books:");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
