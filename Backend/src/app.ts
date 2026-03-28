import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { rateLimiter } from "./middleware/rateLimiter";
import { globalErrorHandler, notFoundHandler } from "./middleware/errorHandler";
import { authenticate } from "./middleware/auth.middleware";
import authRoutes from "./routes/auth.routes";
import aiRoutes from "./routes/ai.routes";
import contactRoutes from "./routes/contact.routes";

export function createApp(): express.Application {
  const app = express();

  if (env.NODE_ENV === "production") {
    app.set("trust proxy", true);
  }

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  app.use(rateLimiter);

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  // Public auth routes
  app.use("/api/auth", authRoutes);

  // Public contact route — no authentication required
  app.use("/api/contact", contactRoutes);

  // Protected AI routes — require authentication
  app.use("/api/ai", authenticate, aiRoutes);

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}
