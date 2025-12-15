import { Router, Request, Response } from "express";
import { Role } from "../lib/auth.js";
import { requireAdmin, requireAuth, requireUser } from "./middleware.js";
import { UserModel, UserDocument } from "./model.js";
import { validateUpdateUser, validateUserId } from "./schema.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  requireUser,
  async (req: Request, res: Response) => {
    try {
      const { name } = req.query;

      const filters: Record<string, unknown> = {};
      if (typeof name === "string" && name.trim()) {
        filters.name = { $regex: name.trim(), $options: "i" };
      }

      const users = await UserModel.find(filters).select("-password").lean();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users", error: err });
    }
  },
);

router.get(
  "/:id",
  requireAuth,
  requireUser,
  validateUserId,
  async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.params.id)
        .select("-password")
        .lean();
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch user", error: err });
    }
  },
);

router.put(
  "/:id",
  requireAuth,
  requireUser,
  validateUserId,
  validateUpdateUser,
  async (req: Request, res: Response) => {
    try {
      const requester = (req as any).user as { sub: string; role: Role };
      const isSelf = requester.sub === req.params.id;
      const hasRoleField = Object.prototype.hasOwnProperty.call(
        req.body,
        "role",
      );
      const hasNonRoleFields = Object.keys(req.body).some(
        (key) => key !== "role",
      );

      // Only the user can update their own profile fields.
      if (hasNonRoleFields && !isSelf) {
        return res
          .status(403)
          .json({ message: "You can not update others profile" });
      }

      // Only admins can update roles.
      if (hasRoleField && requester.role !== Role.admin) {
        return res
          .status(403)
          .json({ message: "Only admins can update roles" });
      }

      // Admins updating someone else may only change role.
      if (!isSelf && requester.role === Role.admin && hasNonRoleFields) {
        return res
          .status(403)
          .json({ message: "Admins may only change roles" });
      }

      // Prevent non-admins from trying to change role on self as well.
      if (isSelf && hasRoleField && requester.role !== Role.admin) {
        return res.status(403).json({ message: "Not allowed" });
      }

      const update = req.body;

      const user = await UserModel.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      })
        .select("-password")
        .lean();

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to update user", error: err });
    }
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  requireUser,
  validateUserId,
  async (req: Request, res: Response) => {
    try {
      const result = await UserModel.findByIdAndDelete(req.params.id).lean();
      if (!result) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Failed to delete user", error: err });
    }
  },
);

export default router;
