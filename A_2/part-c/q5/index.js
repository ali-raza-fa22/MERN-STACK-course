import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Customer } from "../q2/index.js";

async function Q5() {
  await connectToDatabase();
  const customer = new Customer({
    name: "Waseem",
    email: "waseem@example.com",
    address: "Karachi",
  });
  await customer.save();
  console.log("Customer model saved:", customer);
  await mongoose.disconnect();
}

Q5().catch(console.log);
