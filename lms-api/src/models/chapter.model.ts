import mongoose, { Schema, Document } from "mongoose";

export interface IChapter extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  lessons: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const chapterSchema = new Schema<IChapter>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChapter>("Chapter", chapterSchema);
