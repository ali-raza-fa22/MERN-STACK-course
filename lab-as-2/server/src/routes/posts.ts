import { Router, type Request, type Response } from "express";
import Post from "@/models/Post";
import { validatePost } from "@/middleware/validation";

const router: Router = Router();

router.get("/posts", async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

/// <summary>GET single post by ID</summary>
router.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message,
    });
  }
});

/// <summary>CREATE new post</summary>
router.post("/posts", validatePost, async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const post = new Post({ title, content });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
});

/// <summary>UPDATE post by ID</summary>
router.put("/posts/:id", validatePost, async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
});

/// <summary>DELETE post by ID</summary>
router.delete("/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
});

export default router;
