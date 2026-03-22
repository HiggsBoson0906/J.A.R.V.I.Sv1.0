require('dotenv').config();
const { YoutubeTranscript } = require('youtube-transcript');
const { GoogleGenAI } = require("@google/genai");

// Cache
const transcriptCache = new Map();

exports.processVideo = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.json({ success: false, message: 'URL is required' });
        }

        // 1. Extract Video ID
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = match ? match[1] : null;

        if (!videoId) {
            return res.json({ success: false, message: 'Invalid YouTube URL' });
        }

        // Cache check
        if (transcriptCache.has(videoId)) {
            return res.json({ success: true, data: transcriptCache.get(videoId) });
        }

        // 2. Fetch transcript
        let transcriptItems;
        try {
            transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
        } catch (error) {
            console.error("Transcript fetch error:", error);
            return res.json({ success: false, message: 'Transcript not available' });
        }

        if (!transcriptItems || transcriptItems.length === 0) {
            return res.json({ success: false, message: 'Transcript not available' });
        }

        // 3. Combine transcript
        let fullTranscript = transcriptItems.map(item => item.text).join(' ');
        fullTranscript = fullTranscript.split(' ').slice(0, 3000).join(' ');

        // 4. Gemini setup
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.json({
                success: true,
                data: {
                    title: "Mock Title (set GEMINI_API_KEY)",
                    summary: "Mock summary (set GEMINI_API_KEY for real output)",
                    concepts: ["Mock Concept 1", "Mock Concept 2"],
                    key_points: ["Mock point 1", "Mock point 2"],
                    formulas: ["E = mc^2", "v = u + at"]
                }
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
Summarize the YouTube video into structured JEE/NEET study notes.
Include:
- Key concepts
- Important points
- Formulas (if any)
- Simple explanation
Keep it concise and student-friendly.

Return ONLY valid JSON (no markdown, no explanation):

{
  "title": "string",
  "summary": "string",
  "concepts": ["string"],
  "key_points": ["string"],
  "formulas": ["string"]
}

Transcript:
${fullTranscript}
`;

        let responseData = null;
        let retryCount = 0;

        while (retryCount < 2) {
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash-preview",
                    contents: prompt
                });

                let text = response.text;

                // Clean JSON (VERY IMPORTANT)
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();

                const match = text.match(/\{[\s\S]*\}/);

                if (!match) throw new Error("No JSON found");

                responseData = JSON.parse(match[0]);
                break;

            } catch (err) {
                console.error(`Gemini attempt ${retryCount + 1} failed:`, err);
                retryCount++;
            }
        }

        if (!responseData) {
            return res.json({
                success: false,
                message: 'AI failed to generate structured response'
            });
        }

        // Cache
        transcriptCache.set(videoId, responseData);

        return res.json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error('Error in processVideo:', error);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};