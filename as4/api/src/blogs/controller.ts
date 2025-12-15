import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Role } from "../lib/auth.js";
import {
  requireAuth,
  requireCreator,
  requireUser,
} from "../users/middleware.js";
import { BlogModel, BlogDocument } from "./model.js";
import {
  validateBlogId,
  validateCreateBlog,
  validateUpdateBlog,
} from "./schema.js";
import { UserModel } from "../users/model.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  requireUser,
  async (req: Request, res: Response) => {
    try {
      const { title, content, user, search } = req.query;

      if (typeof search === "string" && search.trim()) {
        const searchQuery = search.trim();
        const searchRegex = { $regex: searchQuery, $options: "i" };

        const userIds = await UserModel.find({
          $or: [{ name: searchRegex }, { email: searchRegex }],
        })
          .select("_id")
          .lean();

        const blogs = await BlogModel.find({
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { author: { $in: userIds.map((u) => u._id) } },
          ],
        })
          .populate("author", "name email")
          .lean();

        return res.json(blogs);
      }

      const filters: Record<string, unknown> = {};
      if (typeof title === "string" && title.trim()) {
        filters.title = { $regex: title.trim(), $options: "i" };
      }
      if (typeof content === "string" && content.trim()) {
        filters.content = { $regex: content.trim(), $options: "i" };
      }

      if (typeof user === "string" && user.trim()) {
        const userQuery = user.trim();
        if (mongoose.Types.ObjectId.isValid(userQuery)) {
          filters.author = userQuery;
        } else {
          const regex = new RegExp(userQuery, "i");
          const matchedUsers = await UserModel.find({
            $or: [{ name: regex }, { email: regex }],
          })
            .select("_id")
            .lean();

          const userIds = matchedUsers.map((u) => u._id);
          if (userIds.length === 0) {
            return res.json([]); // no matching authors
          }
          filters.author = { $in: userIds };
        }
      }

      const blogs = await BlogModel.find(filters)
        .populate("author", "name email")
        .lean();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch blogs", error: err });
    }
  },
);

router.get(
  "/:id",
  requireAuth,
  requireUser,
  validateBlogId,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const blog = await BlogModel.findById(req.params.id)
        .populate("author", "name email")
        .lean();
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch blog", error: err });
    }
  },
);

router.post(
  "/",
  requireAuth,
  requireCreator,
  validateCreateBlog,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const requester = (req as any).user as { sub: string; role: Role };
      const blog: BlogDocument = new BlogModel({
        ...req.body,
        author: requester.sub,
      });
      await blog.save();
      const populatedBlog = await BlogModel.findById(blog._id)
        .populate("author", "name email")
        .lean();
      res.status(201).json(populatedBlog);
    } catch (err) {
      res.status(500).json({ message: "Failed to create blog", error: err });
    }
  },
);

router.put(
  "/:id",
  requireAuth,
  requireUser,
  validateBlogId,
  validateUpdateBlog,
  async (req: Request, res: Response) => {
    try {
      const requester = (req as any).user as { sub: string; role: Role };
      const blog = await BlogModel.findById(req.params.id).lean();

      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      const isAuthor = blog.author.toString() === requester.sub;
      const isAdmin = requester.role === Role.admin;

      // Only author or admin can update
      if (!isAuthor && !isAdmin) {
        return res.status(403).json({ message: "You are not allowed to edit" });
      }

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      )
        .populate("author", "name email")
        .lean();

      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: "Failed to update blog", error: err });
    }
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireUser,
  validateBlogId,
  async (req: Request, res: Response) => {
    try {
      const requester = (req as any).user as { sub: string; role: Role };
      const blog = await BlogModel.findById(req.params.id).lean();

      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      const isAuthor = blog.author.toString() === requester.sub;
      const isAdmin = requester.role === Role.admin;

      // Only author or admin can delete
      if (!isAuthor && !isAdmin) {
        return res.status(403).json({ message: "Not allowed" });
      }

      await BlogModel.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Failed to delete blog", error: err });
    }
  },
);

export default router;
