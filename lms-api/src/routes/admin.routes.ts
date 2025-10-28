import { Router } from "express";
import {
  listUsers,
  updateUser,
  deleteUser,
  viewUser,
} from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { validateProfileUpdate } from "../middleware/validation.middleware";

const router = Router();

// All routes require admin
router.use(requireAuth, requireRole("admin"));

// GET /api/admin/user - list users except self
router.get("/users", listUsers);
router.get("/users/:id", viewUser);

// PATCH /api/admin/user/:id - update user's name
router.patch("/users/:id", validateProfileUpdate, updateUser);

// DELETE /api/admin/user/:id - delete user
router.delete("/users/:id", deleteUser);

export default router;
