import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Order } from "../q3/index.js";

async function Q6() {
  await connectToDatabase();
  const order = new Order({
    customer: new mongoose.Types.ObjectId(),
    book: new mongoose.Types.ObjectId(),
    quantity: 3,
  });
  await order.save();
  console.log("Order model saved:", order);

  await mongoose.disconnect();
}

Q6().catch(console.log);
