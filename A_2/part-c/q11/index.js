import { connectToDatabase } from "../client.js";
import { Order } from "../q3/index.js";
import { Book } from "../q1/index.js";
import mongoose from "mongoose";

async function Q11() {
  await connectToDatabase();

  const orders = await Order.find().populate("book");
  console.log("Orders with book details:", orders);
  await mongoose.disconnect();
}

Q11().catch(console.log);
