import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Book } from "../q1/index.js";

async function Q4() {
  await connectToDatabase();
  const book = new Book({ title: "OOP", author: "ali", price: 12, stock: 23 });

  const b = await book.save();
  console.log(b);

  await mongoose.disconnect();
}

Q4().catch(console.log);
