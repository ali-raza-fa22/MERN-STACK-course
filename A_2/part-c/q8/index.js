import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Book } from "../q1/index.js";

async function Q8() {
  await connectToDatabase();

  const book = new Book({
    title: "JSON",
    author: "ali",
    price: 50,
    stock: 10,
  });
  await book.save();
  console.log("Book inserted:", book);
  await mongoose.disconnect();
}

Q8().catch(console.log);
