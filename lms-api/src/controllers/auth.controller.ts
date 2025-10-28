import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { signJwt } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    // determine role server-side: allow auto-admin by configured emails only
    const adminEnv = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
    const adminList = adminEnv
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const desiredRole = adminList.includes(String(email).toLowerCase())
      ? "admin"
      : "user";

    const existing = await User.findOne({ email }).exec();
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    // do not trust client-supplied role; use computed desiredRole
    const user = new User({ name, email, password, role: desiredRole });
    await user.save();

    const token = signJwt({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });

    return res.status(201).json({
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signJwt({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.user is attached by auth middleware
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const current = (req as any).user;
    if (!current) return res.status(401).json({ message: "Not authenticated" });

    const { name } = req.body;
    // Only allow updating name for now
    const user = await User.findById(current.id).exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    await user.save();

    return res
      .status(200)
      .json({
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: (user as any).role,
        },
      });
  } catch (err) {
    next(err);
  }
};
