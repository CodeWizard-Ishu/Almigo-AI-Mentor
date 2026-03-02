import { Router } from "express";
import { validate } from "../middleware/validate";
import { contactSchema } from "../schemas/contact.schema";
import { contactHandler } from "../controllers/contact.controller";

const router = Router();

router.post("/", validate(contactSchema), contactHandler);

export default router;
