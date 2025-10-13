import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const customers = [
      {
        name: "Ali Raza",
        email: "ali@example.com",
        city: "Islamabad",
        phone: "123-456-7890",
      },
      {
        name: "Sara Khan",
        email: "sara@example.com",
        city: "Lahore",
        phone: "234-567-8901",
      },
      {
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        city: "Islamabad",
        phone: "345-678-9012",
      },
    ];

    const result = await db.collection("customers").insertMany(customers);
    console.log(
      `✅ Inserted ${result.insertedCount} customers into the 'customers' collection`
    );
    console.log("Inserted IDs:", result.insertedIds);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
