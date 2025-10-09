import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Order } from "../q3/index.js";

async function Q9(customerId, bookId, quantity = 1) {
  await connectToDatabase();

  const order = new Order({
    customer: customerId,
    book: bookId,
    quantity,
  });
  await order.save();
  console.log("Order created:", order);
  await mongoose.disconnect();
}

Q9("68e73a1eed1e5f88cd3f34e5", "68e7345b8fa2f407e73787be", 1).catch(
  console.log
);
