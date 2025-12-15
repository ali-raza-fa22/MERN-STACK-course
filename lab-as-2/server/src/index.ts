import "dotenv/config";
import cors from "cors";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose from "mongoose";
import postsRouter from "@/routes/posts";
import { errorHandler } from "@/middleware/errorHandler";

const app = express();

/// Logger middleware to track incoming requests
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} ${_res.statusCode}`);
  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

/// Connect to MongoDB and create database
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";

    /// Connect to MongoDB
    await mongoose.connect(mongoUri, {
      dbName: "admin",
    });
    console.log("✓ Connected to MongoDB database");
    const db = mongoose.connection.useDb("lab__a_2");
    return db;
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error);
    process.exit(1);
  }
};

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

/// Use routes
app.use("/api", postsRouter);

/// Error handling middleware (must be last)
app.use(errorHandler);

/// Start server after DB connection
const startServer = async () => {
  await connectDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
  });
};

startServer();
