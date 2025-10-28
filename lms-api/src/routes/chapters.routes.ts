import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import Chapter from "../models/chapter.model";
import Course from "../models/course.model";

const router = express.Router();

// Admin route to create a chapter
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const { title, course } = req.body;
      const chapter = new Chapter({ title, course });
      await chapter.save();
      // Add chapter to course's chapters array
      const courseDoc = await Course.findById(course);
      if (courseDoc) {
        courseDoc.chapters.push(chapter._id as mongoose.Types.ObjectId);
        await courseDoc.save();
      }
      res
        .status(201)
        .json({ message: "Chapter created successfully", chapter });
    } catch (error) {
      res.status(500).json({ message: "Error creating chapter", error });
    }
  }
);

// Admin route to get all chapters
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const chapters = await Chapter.find().populate("course", "title");
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapters", error });
  }
});

// Admin route to get a single chapter
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate(
      "course",
      "title"
    );
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapter", error });
  }
});

// Admin route to update a chapter
router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const { title, course } = req.body;
      const chapter = await Chapter.findByIdAndUpdate(
        req.params.id,
        { title, course },
        { new: true }
      );
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json({ message: "Chapter updated successfully", chapter });
    } catch (error) {
      res.status(500).json({ message: "Error updating chapter", error });
    }
  }
);

// Admin route to delete a chapter
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const chapter = await Chapter.findByIdAndDelete(req.params.id);
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json({ message: "Chapter deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting chapter", error });
    }
  }
);

export default router;
