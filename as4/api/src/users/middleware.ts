import { NextFunction, Request, Response } from "express";

import { Role, verifyAccessToken } from "../lib/auth.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    email: string;
    role: Role;
  };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  next();
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  if (req.user.role !== Role.admin) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  next();
};

export const requireCreator = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  if (req.user.role !== Role.creator && req.user.role !== Role.admin) {
    return res.status(403).json({ message: "Creator or admin role required" });
  }
  next();
};
