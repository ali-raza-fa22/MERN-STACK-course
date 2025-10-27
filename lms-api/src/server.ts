import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("hey world!!");
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/lms-api";

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.use(morgan(":method :url :status - :response-time ms"));

    // Mount routes
    app.use("/api/auth", authRoutes);
    // admin routes mounted separately
    app.use("/api/admin", adminRoutes);

    // Error handler (should be after routes)
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`App is running on PORT:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
