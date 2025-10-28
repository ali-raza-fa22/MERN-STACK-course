import mongoose, { Schema, Document } from "mongoose";

export interface ILesson extends Document {
  title: string;
  description: string;
  videoLink: string;
  imageLink: string;
  chapter: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoLink: { type: String, required: true },
    imageLink: { type: String, required: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILesson>("Lesson", lessonSchema);
