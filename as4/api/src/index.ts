import express from "express";
import mongoose from "mongoose";
import userRouter from "./users/controller.js";
import authRouter from "./auth/controller.js";
import blogRouter from "./blogs/controller.js";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/as4";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `-> ${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`,
    );
  });

  next();
});

app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`api is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
