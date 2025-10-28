import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import User, { UserRole } from "../models/user.model";

// Attach minimal user info to request when token is valid
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = auth.split(" ")[1];
    const payload = verifyJwt<{ sub?: string; email?: string }>(token);
    if (!payload || !payload.sub) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(payload.sub)
      .select("name email role")
      .exec();
    if (!user) return res.status(401).json({ message: "User not found" });

    // attach user to request (cast to any for simplicity)
    (req as any).user = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: (user as any).role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

// role-check middleware factory
export function requireRole(role: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    if (user.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
