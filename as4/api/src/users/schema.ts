import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { Role } from "../lib/auth";

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

const userIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid user id"),
});

const createUserBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(Role).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const validateUserId = validate(userIdSchema, "params");
export const validateCreateUser = validate(createUserBodySchema, "body");
export const validateUpdateUser = validate(updateUserBodySchema, "body");
export const validateLogin = validate(loginBodySchema, "body");
