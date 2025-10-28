import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

// List all users except the requesting admin
export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const current = (req as any).user;
    if (!current) return res.status(401).json({ message: "Not authenticated" });

    const users = await User.find({ _id: { $ne: current.id } })
      .select("_id name email role")
      .lean()
      .exec();

    const payload = users.map((u) => ({
      id: String(u._id),
      name: u.name,
      email: u.email,
      role: (u as any).role,
    }));
    return res.status(200).json({ users: payload });
  } catch (err) {
    next(err);
  }
};

export const viewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const targetId = req.params.id;
  if (!targetId) return res.status(400).json({ message: "Missing user id" });

  const user = await User.findById(targetId)
    .select("_id email name role")
    .exec();

  return res.status(200).json({ user });
};

// Update a user's name (admin only). Cannot update self.
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const current = (req as any).user;
    const targetId = req.params.id;
    if (!targetId) return res.status(400).json({ message: "Missing user id" });

    if (targetId === current.id)
      return res.status(400).json({
        message: "Admins cannot modify their own account via this route",
      });

    const { name } = req.body;
    const user = await User.findById(targetId).exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    await user.save();

    return res.status(200).json({
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

// Delete a user (admin only). Cannot delete self.
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const current = (req as any).user;
    const targetId = req.params.id;
    if (!targetId) return res.status(400).json({ message: "Missing user id" });

    if (targetId === current.id)
      return res
        .status(400)
        .json({ message: "Admins cannot delete themselves" });

    const user = await User.findById(targetId).exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
