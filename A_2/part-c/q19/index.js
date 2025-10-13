import mongoose from "mongoose";
import { connectToDatabase } from "../../client.js";
import { Customer } from "../q2/index.js";

async function Q19() {
  try {
    await connectToDatabase();

    console.log("🧪 Testing Customer schema custom methods...");

    // Create a test customer
    console.log("\n--- Creating Test Customer ---");
    const testCustomer = new Customer({
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main Street, Lahore",
    });

    await testCustomer.save();
    console.log("✅ Test customer created:", testCustomer.name);

    // Test the custom method
    console.log("\n--- Testing displayFullInfo() Custom Method ---");
    const fullInfo = testCustomer.displayFullInfo();
    console.log("📋 Customer full info:", fullInfo);

    // Verify the method returns correct format
    const expected = `${testCustomer.name} - ${testCustomer.email} - ${testCustomer.address}`;
    if (fullInfo === expected) {
      console.log("✅ Custom method returns correct format");
    } else {
      console.log("❌ Custom method format mismatch");
      console.log("   Expected:", expected);
      console.log("   Got:", fullInfo);
    }

    // Test with another customer
    console.log("\n--- Testing with Another Customer ---");
    const anotherCustomer = new Customer({
      name: "Jane Smith",
      email: "jane.smith@company.com",
      address: "456 Oak Avenue, Karachi",
    });

    await anotherCustomer.save();
    console.log(
      "📋 Second customer full info:",
      anotherCustomer.displayFullInfo()
    );

    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error testing custom methods:", error);
    process.exit(1);
  }
}

Q19();
