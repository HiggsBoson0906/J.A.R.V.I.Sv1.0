const { sendJSON, sendError } = require('../utils/helpers');
const { GoogleGenAI } = require('@google/genai');
const { getDB } = require('../db/database');

// ─── GET /practice/subjects ───────────────────────────────────────────────────
exports.getSubjects = async (req, res) => {
  try {
    const db = await getDB();

    // Pull distinct subjects from both tables
    const fromSessions = await db.all(`SELECT DISTINCT subject_name FROM study_sessions WHERE subject_name IS NOT NULL AND subject_name != ''`);
    const fromPerf     = await db.all(`SELECT DISTINCT subject_name FROM performance  WHERE subject_name IS NOT NULL AND subject_name != ''`);

    const set = new Set([
      ...fromSessions.map(r => r.subject_name),
      ...fromPerf.map(r => r.subject_name),
    ]);

    // Always include the core JEE/NEET subjects as a baseline
    ['Physics', 'Chemistry', 'Mathematics'].forEach(s => set.add(s));

    return sendJSON(res, { subjects: [...set].sort() });
  } catch (e) {
    console.error('getSubjects error:', e);
    return sendError(res, 'Failed to fetch subjects', 500);
  }
};

// ─── GET /practice/topics?subject=Physics ────────────────────────────────────
exports.getTopics = async (req, res) => {
  try {
    const { subject } = req.query;
    if (!subject) return sendError(res, 'subject query param is required');

    const userId = req.headers['x-user-id'];
    if (!userId) return sendError(res, 'User context missing', 401);

    const db = await getDB();

    // Join performance data if available
    const perfRows = await db.all(
      `SELECT topic_name, accuracy, questions_attempted FROM performance WHERE subject_name = ? AND user_id = ? ORDER BY accuracy ASC`,
      [subject, userId]
    );

    // Also grab topics from syllabus table that may not be in performance yet
    const syllabusRows = await db.all(
      `SELECT topic_name FROM syllabus WHERE subject_name = ?`,
      [subject]
    );

    // Merge: syllabus topics first, then add performance topics not in syllabus
    const seen = new Set();
    const topics = [];

    syllabusRows.forEach(row => {
      if (!seen.has(row.topic_name)) {
        seen.add(row.topic_name);
        const perf = perfRows.find(p => p.topic_name === row.topic_name);
        topics.push({ topic_name: row.topic_name, accuracy: perf ? perf.accuracy : null, questions_attempted: perf ? perf.questions_attempted : 0 });
      }
    });

    perfRows.forEach(row => {
      if (!seen.has(row.topic_name)) {
        seen.add(row.topic_name);
        topics.push({ topic_name: row.topic_name, accuracy: row.accuracy, questions_attempted: row.questions_attempted });
      }
    });

    // If no topics in DB, provide smart defaults for the subject
    if (topics.length === 0) {
      const defaults = {
        Physics:     ['Kinematics', 'Laws of Motion', 'Work & Energy', 'Thermodynamics', 'Electrostatics', 'Optics', 'Modern Physics'],
        Chemistry:   ['Atomic Structure', 'Chemical Bonding', 'Thermochemistry', 'Organic Chemistry', 'Electrochemistry', 'Coordination Compounds'],
        Mathematics: ['Functions', 'Limits & Continuity', 'Differentiation', 'Integration', 'Matrices', 'Probability', 'Vectors'],
      };
      const list = defaults[subject] || ['General'];
      list.forEach(t => topics.push({ topic_name: t, accuracy: null, questions_attempted: 0 }));
    }

    return sendJSON(res, { topics });
  } catch (e) {
    console.error('getTopics error:', e);
    return sendError(res, 'Failed to fetch topics', 500);
  }
};

// ─── POST /practice/questions ─────────────────────────────────────────────────
exports.getQuestions = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return sendError(res, 'topic is required');

    const userId = req.headers['x-user-id'];
    // Determine difficulty based on current accuracy
    const db = await getDB();
    const perf = await db.get(`SELECT accuracy FROM performance WHERE topic_name = ? AND user_id = ? LIMIT 1`, [topic, userId]);
    const accuracy = perf ? perf.accuracy : null;
    const difficulty = accuracy === null ? 'standard'
                     : accuracy < 50     ? 'easier (foundational)'
                     : accuracy > 75     ? 'harder (advanced)'
                     : 'standard (moderate)';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback template questions if no API key
      return sendJSON(res, {
        questions: [
          {
            question: `What is the primary concept behind ${topic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct_answer: 'Option A'
          }
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a JEE/NEET exam setter.

Generate exactly 5 multiple choice questions for the topic: "${topic}".
Difficulty level: ${difficulty}

Rules:
- Each question must have exactly 4 options labeled as plain text (not A/B/C/D prefixed)
- Only one correct answer per question
- Questions must be exam-level, concise, and factual
- Do NOT repeat options
- Return ONLY valid JSON, no markdown, no explanation

Format:
{
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct_answer": "..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const raw = (response.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON found in Gemini response');

    const parsed = JSON.parse(match[0]);
    if (!parsed.questions || !Array.isArray(parsed.questions)) throw new Error('Invalid questions format');

    return sendJSON(res, { questions: parsed.questions });
  } catch (e) {
    console.error('getQuestions error:', e);
    return sendError(res, 'Failed to generate questions: ' + e.message, 500);
  }
};

// ─── POST /practice/submit ────────────────────────────────────────────────────
exports.submitPractice = async (req, res) => {
  try {
    const { topic, subject, answers } = req.body;
    if (!topic || !answers || !Array.isArray(answers)) {
      return sendError(res, 'topic and answers are required');
    }

    const total   = answers.length;
    const score   = answers.filter(a => a.selected === a.correct).length;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const label   = accuracy < 50 ? 'Weak' : accuracy <= 75 ? 'Moderate' : 'Strong';

    const userId = req.headers['x-user-id'];
    if (!userId) return sendError(res, 'User ID header missing', 401);

    // Update performance table
    const db = await getDB();
    const existing = await db.get(
      `SELECT id, questions_attempted, correct_answers FROM performance WHERE topic_name = ? AND user_id = ? LIMIT 1`,
      [topic, userId]
    );

    if (existing) {
      const newAttempted = existing.questions_attempted + total;
      const newCorrect   = existing.correct_answers   + score;
      const newAccuracy  = Math.round((newCorrect / newAttempted) * 100);
      await db.run(
        `UPDATE performance SET questions_attempted = ?, correct_answers = ?, accuracy = ?, last_studied = CURRENT_TIMESTAMP WHERE id = ?`,
        [newAttempted, newCorrect, newAccuracy, existing.id]
      );
    } else {
      await db.run(
        `INSERT INTO performance (user_id, subject_name, topic_name, accuracy, questions_attempted, correct_answers)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, subject || 'General', topic, accuracy, total, score]
      );
    }

    await db.run(
      `INSERT INTO study_sessions (user_id, subject_name, topic, duration) VALUES (?, ?, ?, ?)`,
      [userId, subject || 'General', topic, total * 30] // rough estimate: 30s per question
    );

    return sendJSON(res, { score, total, accuracy, label });
  } catch (e) {
    console.error('submitPractice error:', e);
    return sendError(res, 'Failed to submit practice: ' + e.message, 500);
  }
};
