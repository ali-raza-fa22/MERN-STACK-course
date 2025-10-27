import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller";
// admin controller moved to its own router (mounted at /api/admin)
import {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
} from "../middleware/validation.middleware";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// POST /api/auth/register
router.post("/register", validateRegister, register);

// POST /api/auth/login
router.post("/login", validateLogin, login);

// GET /api/auth/profile - protected
router.get("/profile", requireAuth, getProfile);

// PATCH /api/auth/profile - update name
router.patch("/profile", requireAuth, validateProfileUpdate, updateProfile);

// Admin routes were moved to src/routes/admin.routes.ts and are mounted at /api/admin

export default router;
