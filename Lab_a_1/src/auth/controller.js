import { User } from "../user/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "very_secret";
const SALT_ROUNDS = 10;

export async function register(req, res) {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "username, email and password are required" });
  }

  try {
    const existing = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();
    if (existing) {
      return res
        .status(409)
        .json({ error: "username or email already in use" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, email, password: hashed });
    await user.save();
    // Do not return the password
    const { password: _p, ...safe } = user.toObject();
    return res.status(201).json({ user: safe });
  } catch (err) {
    console.error("Register error", err);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { sub: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({ token });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "internal server error" });
  }
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.sub).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
