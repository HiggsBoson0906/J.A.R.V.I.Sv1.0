const { sendJSON, sendError } = require('../utils/helpers');
const { GoogleGenAI } = require('@google/genai');
const { getDB } = require('../db/database');

// Simple keyword → subject matcher
const SUBJECT_KEYWORDS = {
  Mathematics: ['calculus', 'algebra', 'matrix', 'vector', 'trigonometry', 'integral', 'derivative', 'probability', 'statistics', 'geometry'],
  Physics: ['force', 'motion', 'energy', 'velocity', 'acceleration', 'wave', 'optics', 'electricity', 'magnet', 'thermodynamics', 'quantum', 'kinematics', 'fluid'],
  Chemistry: ['reaction', 'mole', 'periodic', 'bond', 'organic', 'inorganic', 'acid', 'base', 'salt', 'electro', 'polymer', 'hydrocarbon'],
};

function detectSubject(question) {
  const q = question.toLowerCase();
  for (const [subject, keywords] of Object.entries(SUBJECT_KEYWORDS)) {
    if (keywords.some(kw => q.includes(kw))) return subject;
  }
  return null;
}

async function fetchContext(question, userId) {
  try {
    const db = await getDB();
    const subject = detectSubject(question);
    
    let sessions = [];
    if (userId) {
       sessions = await db.all(`SELECT topic, subject_name FROM study_sessions WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10`, [userId]);
    } else {
       sessions = await db.all(`SELECT topic, subject_name FROM study_sessions ORDER BY timestamp DESC LIMIT 10`);
    }

    let perfRows = [];
    if (subject) {
      if (userId) {
         perfRows = await db.all(
           `SELECT topic_name, accuracy FROM performance WHERE subject_name = ? AND user_id = ? ORDER BY last_studied DESC LIMIT 5`,
           [subject, userId]
         );
      } else {
         perfRows = await db.all(
           `SELECT topic_name, accuracy FROM performance WHERE subject_name = ? ORDER BY last_studied DESC LIMIT 5`,
           [subject]
         );
      }
    }
    const sessionText = sessions.length > 0
      ? sessions.map(s => `- ${s.topic} (${s.subject_name})`).join('\n')
      : 'No recent sessions.';
    const perfText = perfRows.length > 0
      ? perfRows.map(p => `- ${p.topic_name}: ${p.accuracy}% accuracy`).join('\n')
      : 'No performance data.';
    return `Studied Topics:\n${sessionText}\n\nPerformance (${subject || 'General'}):\n${perfText}`;
  } catch {
    return 'No context available.';
  }
}

exports.askDoubt = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return sendError(res, 'A question is required.');
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const userId = req.headers['x-user-id'];
    
    if (!apiKey) {
      return sendJSON(res, {
        explanation: 'AI not configured. Add GEMINI_API_KEY to your .env file.',
        hint: 'Focus on core concepts.',
        exam_tip: 'Always check units and boundary conditions.'
      });
    }

    const context = await fetchContext(question, userId);
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert JEE/NEET teacher with deep knowledge of Mathematics, Physics, and Chemistry.

Answer the student's question clearly:
- Step-by-step explanation, exam-focused
- Avoid unnecessary theory

Also return:
- A short hint
- A useful exam trick or shortcut

STRICT: Return ONLY valid JSON (no markdown, no backticks) in exactly this format:
{
  "explanation": "...",
  "hint": "...",
  "exam_tip": "..."
}

Student Context:
${context}

Question:
${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    // response.text is a property (string) in @google/genai v1.x
    let text = response.text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON block found in response');

    const parsed = JSON.parse(match[0]);

    return sendJSON(res, {
      explanation: parsed.explanation || 'No explanation provided.',
      hint: parsed.hint || 'Review the core concept.',
      exam_tip: parsed.exam_tip || 'Manage your time carefully in exams.'
    });

  } catch (e) {
    console.error('AI Tutor Error:', e.message || e);

    // Detect specific API errors to return useful messages
    const msg = e.message || '';
    if (msg.includes('leaked') || msg.includes('PERMISSION_DENIED')) {
      return sendJSON(res, {
        explanation: '⚠️ Your Gemini API key has been flagged as leaked. Please generate a new one at aistudio.google.com and update your .env file.',
        hint: 'Go to aistudio.google.com → API Keys → Create new key.',
        exam_tip: 'Keep your API keys private and never commit them to version control.'
      });
    }

    return sendJSON(res, {
      explanation: 'AI tutor is temporarily unavailable. Please try again shortly.',
      hint: 'Double-check the formula and applied conditions.',
      exam_tip: 'Eliminate wrong options systematically in MCQs.'
    });
  }
};