import express from "express";
import { register, login, me, authenticateToken } from "../auth/controller.js";

const router = express.Router();

// POST /auth/register
router.post("/register", register);

// POST /auth/login
router.post("/login", login);

// GET /auth/me (protected)
router.get("/me", authenticateToken, me);

export default router;
