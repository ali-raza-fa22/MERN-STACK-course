import express from "express";
import { authenticateToken } from "../auth/controller.js";
import { createPost, getPosts, getUserPosts } from "../post/controller.js";

const router = express.Router();

// GET /posts - get all posts (public)
router.get("/", getPosts);

// POST /posts - create post (protected)
router.post("/", authenticateToken, createPost);

// GET /posts/user - get user's posts (protected)
router.get("/user", authenticateToken, getUserPosts);

export default router;
