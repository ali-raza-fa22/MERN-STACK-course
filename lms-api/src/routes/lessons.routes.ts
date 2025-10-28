import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import Lesson from "../models/lesson.model";
import Chapter from "../models/chapter.model";

const router = express.Router();

// Admin route to create a lesson
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const { title, description, videoLink, imageLink, chapter } = req.body;
      const lesson = new Lesson({
        title,
        description,
        videoLink,
        imageLink,
        chapter,
      });
      await lesson.save();
      // Add lesson to chapter's lessons array
      const chapterDoc = await Chapter.findById(chapter);
      if (chapterDoc) {
        chapterDoc.lessons.push(lesson._id as mongoose.Types.ObjectId);
        await chapterDoc.save();
      }
      res.status(201).json({ message: "Lesson created successfully", lesson });
    } catch (error) {
      res.status(500).json({ message: "Error creating lesson", error });
    }
  }
);

// Admin route to get all lessons
router.get(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const lessons = await Lesson.find().populate("chapter", "title");
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lessons", error });
    }
  }
);

// Admin route to get a single lesson
router.get(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const lesson = await Lesson.findById(req.params.id).populate(
        "chapter",
        "title"
      );
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lesson", error });
    }
  }
);

// Admin route to update a lesson
router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const { title, description, videoLink, imageLink, chapter } = req.body;
      const lesson = await Lesson.findByIdAndUpdate(
        req.params.id,
        { title, description, videoLink, imageLink, chapter },
        { new: true }
      );
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json({ message: "Lesson updated successfully", lesson });
    } catch (error) {
      res.status(500).json({ message: "Error updating lesson", error });
    }
  }
);

// Admin route to delete a lesson
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const lesson = await Lesson.findByIdAndDelete(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting lesson", error });
    }
  }
);

export default router;
