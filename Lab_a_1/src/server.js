import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import { connectToDatabase } from "./client.js";

const PORT = process.env.PORT || 3000;

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Basic middleware
app.use(express.json());
app.use(express.static("src/views"));
app.use("/uploads", express.static("uploads"));
app.use(fileUpload());

// Health-check
app.get("/", (req, res) => res.json({ status: "ok" }));

// Mount auth routes
app.use("/auth", authRouter);
app.use("/posts", postRouter);

// Auth views
app.get("/login", (req, res) =>
  res.sendFile(path.join(process.cwd(), "src/views/auth/login.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.join(process.cwd(), "src/views/auth/register.html"))
);
app.get("/profile", (req, res) =>
  res.sendFile(path.join(process.cwd(), "src/views/profile.html"))
);
app.get("/dashboard", (req, res) =>
  res.sendFile(path.join(process.cwd(), "src/views/dashboard.html"))
);
app.get("/add-post", (req, res) =>
  res.sendFile(path.join(process.cwd(), "src/views/add-post.html"))
);

let server;

async function start() {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error("Could not connect to DB. Exiting.");
    process.exit(1);
  }

  server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

// Graceful shutdown
async function shutdown() {
  console.log("Shutting down...");
  if (server) {
    server.close(() => console.log("HTTP server closed"));
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
