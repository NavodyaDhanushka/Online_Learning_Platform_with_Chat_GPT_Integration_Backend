import {getAiCourseSuggestions} from "../services/aiService.js";
import AiLog from "../models/aiLog.js";

export async function askAiForCourseSuggestions(req, res) {
    try {

        const {query} = req.body;
        const userId = req.user.id;

        if (!query) {
            return res.status(400).json({error: "query is required"});
        }
        const response = await getAiCourseSuggestions(query);

        await AiLog.create({
            userId: userId || null,
            question: query,
            response: response
        });

        res.json({
            success: true,
            answer: response,
        });
    } catch (error) {
        console.error("AI Suggestion Error:", error);
        res.status(400).json({error: "Internal Server Error"});
    }
}