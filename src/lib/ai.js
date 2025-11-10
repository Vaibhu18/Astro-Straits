import { GoogleGenAI } from "@google/genai";

export const generateTitle = async (model, prompt) => {

    if (model.llm === "gemini") {
        const apiKey = model.apiKey;

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: model.model,
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `You are a professional title generator. Create one concise and catchy title (5–10 words) for the following text.
                                    The title must always follow this format: <Main Topic>: <Short descriptive phrase>
                                    Example: Java Programming: A Brief Overview of the Language, Artificial Intelligence: Transforming the Future of Technology
                                    Do not include quotes or any other punctuation besides the single colon. Text: ${prompt}`,
                        },
                    ],
                },
            ],
        });

        let textResp = "";

        if ((response.text).includes(":")) {
            textResp = (response.text).split(":")[1];
        } else {
            textResp = response.text;
        }
        return textResp;
    }
    // DOTO for other llm models
}

export const generateAIMessage = async (model, prompt, history = []) => {
    try {
        if (model.llm === "gemini") {
            const apiKey = model.apiKey;

            if (!apiKey?.trim()) {
                return {
                    success: false, errorType: "Configuration Error", message: "Missing or invalid Gemini API key. Please configure your AI settings.",
                };
            }

            const processedHistory = history.map((msg) => {
                let text = msg.content;
                if (msg.role === "ai" && text.length > 800) {
                    text =
                        text.slice(0, 400) +
                        "\n\n[...previous long AI message truncated for context...]";
                }
                return {
                    role: msg.role === "ai" ? "model" : "user",
                    parts: [{ text }],
                };
            });


            const ai = new GoogleGenAI({ apiKey });

            const response = await ai.models.generateContent({
                model: model.model,
                contents: [...processedHistory,
                {
                    role: "user",
                    parts: [
                        {
                            text: `You are a professional AI assistant designed to provide clear, concise, and helpful responses.
Follow these behavior rules carefully:

1. Communicate in a professional yet friendly, human-like tone.
2. Use plain, easy-to-understand language — avoid jargon or wordiness.
3. When explaining technical or programming concepts:
   - Provide accurate and to-the-point explanations.
   - Include only essential comments in code (use them to clarify logic, not every line).
   - Format code cleanly and correctly.
4. When answering general questions:
   - Be direct, informative, and empathetic.
   - Avoid repetition or unnecessary detail.
5. Keep all responses short but complete — cover what is needed without overwhelming the user.

User request: ${prompt}`,
                        },
                    ],
                },
                ],
            });
            if (response.text) {
                return { success: true, content: response.text }
            } else {
                return { success: false, errorType: "AI Response Error", message: "AI failed to generate a valid response. Please try again." }
            }
        } else {
            return {
                success: false, errorType: "Unsupported Model", message: "Unsupported AI model specified. Please use a valid model configuration.",
            };
        }
    } catch (error) {
        console.error("❌ [generateAIMessage] Internal Error:", error?.message || error);
        return { success: false, errorType: "Server Error", message: "Sorry, I couldn’t process that." };
    }
}