import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q11: Delete a customer by email
async function deleteCustomerByEmail(email) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const result = await db.collection("customers").deleteOne({ email });

    if (result.deletedCount > 0) {
      console.log("✅ Customer deleted successfully");
      console.log(`  Deleted: ${result.deletedCount} document(s)`);
      console.log(`  Email: "${email}"`);
    } else {
      console.log(`❌ No customer found with email: "${email}"`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error deleting customer:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await deleteCustomerByEmail("john.doe@example.com");
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
