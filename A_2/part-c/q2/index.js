import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  address: { type: String, required: true },
});

customerSchema.methods.displayFullInfo = function () {
  return `${this.name} - ${this.email} - ${this.address}`;
};

export const Customer = mongoose.model("Customer", customerSchema);
