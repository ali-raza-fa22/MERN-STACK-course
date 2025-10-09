import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "Quantity must be at least 1"],
  },
  orderDate: { type: Date, required: true, default: Date.now },
});

orderSchema.virtual("total").get(function () {
  return this.quantity * (this.book ? this.book.price : 0);
});

export const Order = mongoose.model("Order", orderSchema);
