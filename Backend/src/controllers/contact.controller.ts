import { Request, Response } from "express";
import { sendContactEmail } from "../services/contact.service";
import { logger } from "../utils/logger";
import type { ContactInput } from "../schemas/contact.schema";

export async function contactHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = req.body as ContactInput;
    await sendContactEmail(data);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (error) {
    logger.error("Failed to send contact email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send your message. Please try again later.",
    });
  }
}
