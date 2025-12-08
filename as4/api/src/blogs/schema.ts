import { NextFunction, Request, Response } from "express";
import { z } from "zod";

type ValidationTarget = "body" | "params" | "query";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const validate =
  (schema: z.ZodSchema, target: ValidationTarget) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({ errors });
    }

    (req as any)[target] = result.data;
    next();
  };

const blogIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid blog id"),
});

const createBlogBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(40, "Title must be < 40 characters"),
  content: z.string().min(1, "Content is required"),
});

const updateBlogBodySchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const validateBlogId = validate(blogIdSchema, "params");
export const validateCreateBlog = validate(createBlogBodySchema, "body");
export const validateUpdateBlog = validate(updateBlogBodySchema, "body");
