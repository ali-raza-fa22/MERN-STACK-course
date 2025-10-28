import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import coursesRoutes from "./routes/courses.routes";
import chaptersRoutes from "./routes/chapters.routes";
import lessonsRoutes from "./routes/lessons.routes";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import { connectToDatabase } from "./utils/connectToDatabase";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("hey world!!");
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
  try {
    await connectToDatabase();

    app.use(morgan(":method :url :status - :response-time ms"));

    // Mount routes
    app.use("/api/auth", authRoutes);
    // admin routes mounted separately
    app.use("/api/admin", adminRoutes);
    app.use("/api/courses", coursesRoutes);
    app.use("/api/chapters", chaptersRoutes);
    app.use("/api/lessons", lessonsRoutes);

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
