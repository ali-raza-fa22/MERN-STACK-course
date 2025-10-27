import { Post } from "./model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    console.error("Get posts error", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createPost(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  let imagePath = null;
  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadPath = path.join(__dirname, "../../uploads", image.name);
    await image.mv(uploadPath);
    imagePath = `/uploads/${image.name}`;
  }

  try {
    const post = new Post({
      title,
      content,
      image: imagePath,
      user: req.user.sub,
    });
    await post.save();
    res.status(201).json({ post });
  } catch (err) {
    console.error("Create post error", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getUserPosts(req, res) {
  try {
    const posts = await Post.find({ user: req.user.sub }).sort({
      createdAt: -1,
    });
    res.json({ posts });
  } catch (err) {
    console.error("Get user posts error", err);
    res.status(500).json({ error: "Server error" });
  }
}
