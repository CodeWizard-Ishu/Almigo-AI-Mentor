import { Request, Response, NextFunction } from "express";
import { streamChat, generateRoadmap, summarizeSession } from "../services/ai.service";
import { searchMentors } from "../services/mentorSearch.service";
import { logger } from "../utils/logger";

export async function chatHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { conversationId, message } = req.body as {
      conversationId: string;
      message: string;
    };

    await streamChat(conversationId, message, res);
  } catch (error) {
    if (res.headersSent) {
      logger.error("Streaming error:", error);
      res.end();
      return;
    }
    next(error);
  }
}

export async function roadmapHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { goal, currentSkills, timeline } = req.body as {
      goal: string;
      currentSkills: string[];
      timeline: string;
    };

    const roadmap = await generateRoadmap(goal, currentSkills, timeline);

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
}

export async function summarizeHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { transcript } = req.body as { transcript: string };

    const summary = await summarizeSession(transcript);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchMentorsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { query, topK } = req.body as { query: string; topK?: number };

    const results = await searchMentors(query, topK);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
}
