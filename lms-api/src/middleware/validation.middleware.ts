import { Request, Response, NextFunction } from "express";

function isEmail(value: string) {
  // simple email regex (sufficient for basic validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body || {};
  const errors: Array<{ field: string; message: string }> = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name is required and must be at least 2 characters",
    });
  }

  if (!email || typeof email !== "string" || !isEmail(email)) {
    errors.push({ field: "email", message: "A valid email is required" });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push({
      field: "password",
      message: "Password is required and must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // normalize
  req.body.email = (email as string).toLowerCase().trim();
  req.body.name = (name as string).trim();

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body || {};
  const errors: Array<{ field: string; message: string }> = [];

  if (!email || typeof email !== "string" || !isEmail(email)) {
    errors.push({ field: "email", message: "A valid email is required" });
  }

  if (!password || typeof password !== "string" || password.length < 1) {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.email = (email as string).toLowerCase().trim();
  next();
}

export function validateProfileUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body || {};
  const errors: Array<{ field: string; message: string }> = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name is required and must be at least 2 characters",
    });
  }

  if (errors.length > 0) return res.status(400).json({ errors });

  req.body.name = (name as string).trim();
  next();
}
