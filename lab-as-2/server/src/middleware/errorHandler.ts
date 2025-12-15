import { type Request, type Response, type NextFunction } from "express";

/// <summary>Global error handling middleware</summary>
/// <param name="error">Error object</param>
/// <param name="req">Express request object</param>
/// <param name="res">Express response object</param>
/// <param name="next">Express next middleware function</param>
export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("✗ Error:", error.message);

  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation error",
      details: error.message,
    });
    return;
  }

  if (error.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
    return;
  }

  if (error.code === 11000) {
    res.status(409).json({
      success: false,
      message: "Duplicate entry. This resource already exists.",
    });
    return;
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
