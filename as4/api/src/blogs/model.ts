import mongoose, { Document, Schema, Types } from "mongoose";

export interface BlogDocument extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel =
  (mongoose.models.Blog as mongoose.Model<BlogDocument>) ||
  mongoose.model<BlogDocument>("Blog", blogSchema);
