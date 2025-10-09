import mongoose from "mongoose";
import { connectToDatabase } from "../client.js";
import { Book } from "../q1/index.js";

async function Q15(bookId) {
  await connectToDatabase();

  const result = await Book.findByIdAndDelete(bookId);
  if (result) {
    console.log("Book deleted:", result);
  } else {
    console.log("Book not found");
  }
  const found = await Book.findById(bookId);
  console.log(found);
  await mongoose.disconnect();
}

Q15("68e325385bd215226fd76d1f").catch(console.log);
