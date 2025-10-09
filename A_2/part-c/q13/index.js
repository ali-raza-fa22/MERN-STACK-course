import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Customer } from "../q2/index.js";

async function Q13(customerId) {
  await connectToDatabase();

  const result = await Customer.findByIdAndDelete(customerId);
  if (result) {
    console.log("Customer deleted:", result);
  } else {
    console.log("Customer not found");
  }

  const found = await Customer.findById(customerId);
  console.log(found);
  await mongoose.disconnect();
}

Q13("68e73bca5132d8e070bb1854").catch(console.log);
