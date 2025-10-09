import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be greater than 0"],
  },
  stock: { type: Number, required: true, min: [0, "Stock cannot be negative"] },
});

export const Book = mongoose.model("Book", bookSchema);
