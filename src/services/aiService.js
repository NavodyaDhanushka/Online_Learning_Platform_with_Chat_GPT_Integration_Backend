import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
import Course from "../models/course.js";


const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4-turbo-preview"
});

export async function getAiCourseSuggestions(userQuery) {

    const courses = await Course.find()
        .populate("instructor", "name")
        .lean();

    const courseListText = courses.map((c, idx) => {
        return `
        Course ${idx + 1}:
        Title: ${c.title}
        Description: ${c.description}
        Content: ${c.content}
        Instructor: ${c.instructor?.name || "Unknown"}`;
    }).join("\n\n");

    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are an AI course assistant.

You MUST follow these rules:

1. Answer ONLY using the information from the provided course list.
2. Return ALL responses in clean and structured HTML.
3. When describing matching courses, include the following attributes:
   - Title
   - Description
   - Content
   - Instructor
4. If multiple courses match, list all of them.
5. If nothing matches, respond with:
   <p>I could not find this in the provided courses.</p>
   
   Format each course like this:


  <b>$CourseTitle</b>
  <p><b>Description:</b> $Description</p>
  <p><b>Content:</b> $Content</p>
  <p><b>Instructor:</b> $InstructorName</p>
  <hr>


COURSE LIST:
{context}`
        ],
        ["user", "{input}"],
    ]);

    // Create chain
    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    // Invoke chain
    const result = await chain.invoke({
        input: userQuery,
        context: courseListText
    });

    return result;
}