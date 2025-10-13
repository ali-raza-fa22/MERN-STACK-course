import { connectToDatabase } from "../client.js";
import mongoose from "mongoose";

// Q3: Function to insert a new customer into the customers collection
async function insertCustomer(name, email, address, phone) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const customer = {
      name,
      email,
      address,
      phone,
      registeredAt: new Date(),
    };

    const result = await db.collection("customers").insertOne(customer);

    console.log("✅ Customer inserted successfully");
    console.log("Customer ID:", result.insertedId);
    console.log("Customer details:", customer);

    return result.insertedId;
  } catch (error) {
    console.error("❌ Error inserting customer:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  }
}

// Example usage
async function main() {
  try {
    await insertCustomer(
      "John Doe",
      "john.doe@example.com",
      "123 Main St, New York, NY 10001",
      "+1-555-1234"
    );
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}

main();
