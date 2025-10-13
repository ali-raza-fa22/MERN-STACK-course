import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q16: Update multiple customer addresses at once
async function updateMultipleCustomerAddresses(filter, newAddress) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db
      .collection("customers")
      .updateMany(filter, {
        $set: { address: newAddress, updatedAt: new Date() },
      });

    console.log("✅ Multiple customer addresses updated successfully");
    console.log(`  Matched: ${result.matchedCount} document(s)`);
    console.log(`  Modified: ${result.modifiedCount} document(s)`);
    console.log(`  New Address: "${newAddress}"`);

    return result;
  } catch (error) {
    console.error("❌ Error updating customer addresses:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    // Update all customers in a specific city
    const filter = { address: /New York/i };
    const newAddress = "456 Updated St, New York, NY 10002";

    await updateMultipleCustomerAddresses(filter, newAddress);
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
