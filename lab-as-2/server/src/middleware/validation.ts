import { type Request, type Response, type NextFunction } from "express";

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required and must be a non-empty string",
    });
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Content is required and must be a non-empty string",
    });
  }

  next();
};
