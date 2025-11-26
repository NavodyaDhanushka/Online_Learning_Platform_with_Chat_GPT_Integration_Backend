import {getAiCourseSuggestions} from "../services/aiService.js";

export async function askAiForCourseSuggestions(req, res) {
    try {
        const {query} = req.body;

        if (!query) {
            return res.status(400).json({error: "query is required"});
        }
        const response = await getAiCourseSuggestions(query);

        res.json({
            success: true,
            answer: response,
        });
    } catch (error) {
        console.error("AI Suggestion Error:", error);
        res.status(400).json({error: "Internal Server Error"});
    }
}