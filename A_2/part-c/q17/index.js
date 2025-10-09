import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Customer } from "../q2/index.js";

async function Q17() {
  try {
    await connectToDatabase();

    // Query to fetch all customers living in "Lahore"
    const customers = await Customer.find({
      address: { $regex: "Lahore", $options: "i" },
    });

    console.log("🏠 Customers living in Lahore:");
    console.log(`Found ${customers.length} customers:`);

    if (customers.length === 0) {
      console.log("   No customers found in Lahore");
    } else {
      customers.forEach((customer, index) => {
        console.log(`\n--- Customer ${index + 1} ---`);
        console.log(`Name: ${customer.name}`);
        console.log(`Email: ${customer.email}`);
        console.log(`Address: ${customer.address}`);
      });
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error fetching customers from Lahore:", error);
    process.exit(1);
  }
}

Q17();
