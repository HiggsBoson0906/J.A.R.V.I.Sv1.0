const { sendJSON, sendError } = require('../utils/helpers');
const { GoogleGenerativeAI } = require('@google/genai');

exports.askDoubt = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) return sendError(res, "Question payload is required");

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return sendJSON(res, {
                explanation: `Detailed explanation fallback for: ${question}. Remember to add GEMINI_API_KEY to your .env to enable true dynamic generation!`,
                hint: `Focus on the core foundation rules.`,
                exam_tip: `Memos or variables are often given in standard question headers.`
            });
        }

        const ai = new GoogleGenerativeAI({ apiKey });
        const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: `Act as a world class JEE/Standard exams tutor.
             Answer the student's doubt directly.
             Return ONLY a pure JSON object without markdown fences, with these exact keys:
             - explanation: detailed step-by-step mathematical or logic solution
             - hint: one sentence short hint
             - exam_tip: exam shortcut or trick regarding this type of question
             
             Student Doubt: ${question}`,
             config: {
                responseMimeType: "application/json"
             }
        });

        const parsed = JSON.parse(response.text());
        sendJSON(res, {
            explanation: parsed.explanation || "No explanation provided.",
            hint: parsed.hint || "Review core concepts.",
            exam_tip: parsed.exam_tip || "Manage your time effectively."
        });

    } catch(e) {
        console.error("AI Generation Error:", e);
        sendJSON(res, {
            explanation: `Our AI system is currently calibrating. Fallback mock explanation invoked.`,
            hint: `Double check formulas.`,
            exam_tip: `Constants are often standard references.`
        });
    }
};
