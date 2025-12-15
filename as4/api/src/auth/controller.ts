import { Router, Request, Response } from "express";

import { Role, signAccessToken } from "../lib/auth.js";
import { UserModel, UserDocument } from "../users/model.js";
import { validateCreateUser, validateLogin } from "../users/schema.js";
import { requireAuth, requireUser } from "../users/middleware.js";
import { BlogModel } from "../blogs/model.js";

const router = Router();

const handleUserCreateError = (res: Response, err: unknown) => {
  // Mongo duplicate key error for unique email
  if ((err as any)?.code === 11000) {
    res.status(409).json({ message: "Email already in use" });
    return true;
  }

  // Mongoose validation errors
  if ((err as any)?.name === "ValidationError") {
    res.status(400).json({ message: "Validation failed", error: err });
    return true;
  }

  return false;
};

const sanitizeUser = (user: UserDocument | Record<string, unknown>) => {
  const obj = (user as any).toObject ? (user as any).toObject() : user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, __v, ...rest } = obj;
  return rest;
};

const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || "")
    .replace(/;/g, ",")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

router.post(
  "/register",
  validateCreateUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const email: string = req.body.email;
      const normalizedEmail = email.trim().toLowerCase();
      const shouldBeAdmin = adminEmails.has(normalizedEmail);

      const user: UserDocument = new UserModel({
        ...req.body,
        email: normalizedEmail,
        role: shouldBeAdmin ? Role.admin : Role.user,
      });
      await user.save();
      const token = signAccessToken({
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      });
      res.status(201).json({ user: sanitizeUser(user), token });
    } catch (err) {
      if (handleUserCreateError(res, err)) return;
      res.status(500).json({ message: "Failed to register user", error: err });
    }
  },
);

router.post(
  "/login",
  validateLogin,
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = signAccessToken({
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      });
      res.json({ user: sanitizeUser(user), token });
    } catch (err) {
      res.status(500).json({ message: "Failed to login", error: err });
    }
  },
);

router.get(
  "/me",
  requireAuth,
  requireUser,
  async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById((req as any).user.sub)
        .select("-password")
        .lean();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const blogs = await BlogModel.find({ author: user._id }).lean();
      res.json({ user, blogs });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch profile", error: err });
    }
  },
);

export default router;
