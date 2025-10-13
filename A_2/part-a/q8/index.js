import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Assume a book ID and quantity sold (in real scenario, get from order)
    const bookId = new mongoose.Types.ObjectId("68e74e6793171f25af092247"); // Replace with actual book ID
    const quantitySold = 5;

    const result = await db
      .collection("books")
      .updateOne({ _id: bookId }, { $inc: { stock: -quantitySold } });

    if (result.matchedCount > 0) {
      console.log("✅ Updated stock for book after order");
      console.log(`Modified ${result.modifiedCount} document(s)`);
    } else {
      console.log("❌ Book not found");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
