const MODEL = "claude-sonnet-4-20250514";

export async function generateQuestions({ role, company, type, difficulty, questionCount }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate exactly ${questionCount} ${type} interview questions for a ${difficulty}-level ${role} role at ${company || "a top tech company"}.
Return ONLY a valid JSON array of objects with this shape:
[{ "id": 1, "question": "...", "type": "${type}", "hint": "...", "idealPoints": ["..."] }]
No markdown, no explanation — raw JSON only.`,
      }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || "[]";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return [];
  }
}

export async function scoreAnswer({ question, answer, type }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are an expert ${type} interviewer. Score this answer.

Question: ${question}
Answer: ${answer}

Return ONLY valid JSON with this exact shape:
{
  "communication": <1-10>,
  "technicalDepth": <1-10>,
  "structure": <1-10>,
  "confidence": <1-10>,
  "overall": <1-10>,
  "whatWorked": "...",
  "improve": "...",
  "idealAnswer": "..."
}
No markdown, no explanation — raw JSON only.`,
      }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || "{}";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return { communication: 5, technicalDepth: 5, structure: 5, confidence: 5, overall: 5, whatWorked: "", improve: "", idealAnswer: "" };
  }
}

export async function generateCoachingNotes(answers) {
  const summary = answers.map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.transcript}`).join("\n\n");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Based on this interview session, give 3 concise coaching notes — 1 positive, 2 improvements.

${summary}

Return ONLY valid JSON:
[{ "type": "positive" | "improve", "note": "..." }]
No markdown, no explanation.`,
      }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || "[]";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return [];
  }
}