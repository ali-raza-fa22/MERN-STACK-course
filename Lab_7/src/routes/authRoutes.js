import { Router } from "express";
import passport from "passport";
import User from "../models/User.js";

const router = Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful!" });
});

// Protected profile route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

router.get("/profile", ensureAuthenticated, (req, res) => {
  // Do not send password or sensitive fields
  const user = req.user;
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user._id, username: user.username });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed." });
    res.status(200).json({ message: "Logout successful!" });
  });
});

export default router;
