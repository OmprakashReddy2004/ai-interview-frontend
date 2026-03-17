const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function ask(prompt) {
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, "").trim();
  return text;
}

async function generateQuestions({ role, techStack, type, difficulty, questionCount }) {
  const stackNote = techStack?.length ? `Focus on: ${techStack.join(", ")}.` : "";
  const text = await ask(`Generate exactly ${questionCount} ${type} interview questions for a ${difficulty}-level ${role} role. ${stackNote}
Return ONLY a valid JSON array, no markdown:
[{"id":1,"question":"...","type":"${type}","difficulty":"${difficulty}","hint":"...","idealPoints":["..."]}]`);
  try { return JSON.parse(text); } catch { return []; }
}

async function scoreAnswer({ question, answer, type, techStack }) {
  const stackNote = techStack?.length ? `Stack: ${techStack.join(", ")}.` : "";
  const text = await ask(`You are an expert ${type} interviewer. ${stackNote}
Question: ${question}
Answer: ${answer}
Return ONLY valid JSON, no markdown:
{"communication":<1-10>,"technicalDepth":<1-10>,"structure":<1-10>,"confidence":<1-10>,"overall":<1-10>,"whatWorked":"...","improve":"...","idealAnswer":"..."}`);
  try { return JSON.parse(text); }
  catch { return { communication:5,technicalDepth:5,structure:5,confidence:5,overall:5,whatWorked:"",improve:"",idealAnswer:"" }; }
}

async function generateCoachingNotes(answers) {
  const summary = answers.map((a,i) => `Q${i+1}: ${a.question}\nAnswer: ${a.transcript}\nScore: ${a.score?.overall}/10`).join("\n\n");
  const text = await ask(`Give 3 coaching notes (1 positive, 2 improvements) for this interview:
${summary}
Return ONLY valid JSON array, no markdown:
[{"type":"positive","note":"..."},{"type":"improve","note":"..."},{"type":"improve","note":"..."}]`);
  try { return JSON.parse(text); } catch { return []; }
}

async function analyzeResume({ resumeText, jobDescription }) {
  const text = await ask(`Analyze this resume against the job description.
RESUME: ${resumeText}
JOB DESCRIPTION: ${jobDescription}
Return ONLY valid JSON, no markdown:
{"matchScore":<0-100>,"summary":"...","strengths":["..."],"gaps":["..."],"keywords":{"matched":["..."],"missing":["..."]},"tailoredQuestions":[{"question":"...","reason":"..."}]}`);
  try { return JSON.parse(text); } catch { return null; }
}

module.exports = { generateQuestions, scoreAnswer, generateCoachingNotes, analyzeResume };