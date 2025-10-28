import mongoose, { Schema, Document } from "mongoose";
import User from "./user.model"; // Assuming user.model.ts exists

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  chapters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Export the model
export default mongoose.model<ICourse>("Course", courseSchema);
