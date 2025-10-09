import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Customer } from "../q2/index.js";

async function Q7() {
  await connectToDatabase();

  const customer = new Customer({
    name: "Ali Khan",
    email: "ali.khan@example.com",
    address: "Lahore",
  });
  await customer.save();
  console.log("Customer inserted:", customer);
  await mongoose.disconnect();
}

Q7().catch(console.log);
