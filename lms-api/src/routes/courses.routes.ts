import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import Course from "../models/course.model";
import { connectToDatabase } from "../utils/connectToDatabase";

const router = express.Router();

// Admin route to create a course
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      await connectToDatabase();
      const { title, description, thumbnail, category } = req.body;
      // Validation can be added here or in middleware
      const course = new Course({
        title,
        description,
        thumbnail,
        category,
      });
      await course.save();
      res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error });
    }
  }
);

// Admin route to get all courses
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Admin route to get a single course
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// Admin route to update a course
router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const { title, description, thumbnail, category } = req.body;
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { title, description, thumbnail, category },
        { new: true }
      );
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course updated successfully", course });
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
  }
);

// Admin route to delete a course
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: Request, res: Response) => {
    try {
      await connectToDatabase();
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  }
);

export default router;
