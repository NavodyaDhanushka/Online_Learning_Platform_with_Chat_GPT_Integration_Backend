import {Router} from "express";
import {askAiForCourseSuggestions} from "../controllers/aiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/ask", authMiddleware, askAiForCourseSuggestions);

export default router;