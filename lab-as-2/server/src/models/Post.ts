import { Schema, model } from "mongoose";

export interface IPost {
  /// <summary>Post title</summary>
  title: string;

  /// <summary>Post content/body text</summary>
  content: string;
}

/// <summary>Post Schema definition for MongoDB collection</summary>
const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

/// <summary>Post model for database operations</summary>
const Post = model<IPost>("Post", postSchema);
export default Post;
