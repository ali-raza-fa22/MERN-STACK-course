import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q6: Fetch all customers from the customers collection
async function fetchAllCustomers() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const customers = await db.collection("customers").find({}).toArray();

    console.log("✅ Fetched all customers successfully");
    console.log(`Total customers found: ${customers.length}\n`);

    if (customers.length === 0) {
      console.log("No customers found in the collection.");
    } else {
      customers.forEach((customer, index) => {
        console.log(`Customer ${index + 1}:`);
        console.log(`  ID: ${customer._id}`);
        console.log(`  Name: ${customer.name}`);
        console.log(`  Email: ${customer.email}`);
        console.log(`  Address: ${customer.address}`);
        console.log(`  Phone: ${customer.phone}`);
        console.log("---");
      });
    }

    return customers;
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await fetchAllCustomers();
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
