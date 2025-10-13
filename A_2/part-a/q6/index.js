import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const customers = await db.collection("customers").find({ city: "Islamabad" }).toArray();
    console.log("✅ Customers living in Islamabad:");
    console.log(customers);
    console.log(`Total customers found: ${customers.length}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();