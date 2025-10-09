import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Book } from "../q1/index.js";

async function Q12(bookId, quantity) {
  await connectToDatabase();

  const book = await Book.findById(bookId);
  if (!book) {
    console.log("Book not found");
    await mongoose.disconnect();
    return;
  }
  if (book.stock < quantity) {
    console.log("Not enough stock");
    await mongoose.disconnect();
    return;
  }
  book.stock -= quantity;
  await book.save();
  console.log("Book stock updated:", book);
  await mongoose.disconnect();
}

Q12("68e73c100b7c601ae11a5083", 2).catch(console.log);
