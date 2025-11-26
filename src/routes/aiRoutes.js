import {Router} from "express";
import {askAiForCourseSuggestions} from "../controllers/aiController.js";

const router = Router();
router.post("/ask", askAiForCourseSuggestions);

export default router;