import { auth } from "../firebase";

const API = process.env.NODE_ENV === "development"
  ? "http://localhost:4000/api"
  : "/api";

async function getHeaders() {
  // Force refresh token if it's close to expiry
  const token = await auth.currentUser?.getIdToken(true);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res) {
  if (res.status === 401) {
    // Token expired — redirect to sign in
    window.location.href = "/signin";
    throw new Error("Session expired, please sign in again");
  }
  if (res.status === 429) {
    throw new Error("Too many requests — please wait a moment before trying again");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function generateQuestions(config) {
  const res = await fetch(`${API}/interview/generate`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(config),
  });
  const data = await handleResponse(res);
  return data.questions;
}

export async function scoreAnswer({ question, answer, type, techStack }) {
  const res = await fetch(`${API}/interview/score`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ question, answer, type, techStack }),
  });
  const data = await handleResponse(res);
  return data.score;
}

export async function generateCoachingNotes(answers) {
  const res = await fetch(`${API}/interview/coaching`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ answers }),
  });
  const data = await handleResponse(res);
  return data.notes;
}

export async function analyzeResume({ resumeText, jobDescription }) {
  const res = await fetch(`${API}/resume/analyze`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ resumeText, jobDescription }),
  });
  const data = await handleResponse(res);
  return data.analysis;
}

export async function saveSession(payload) {
  const res = await fetch(`${API}/sessions/save`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getSessions(limit = 20) {
  const res = await fetch(`${API}/sessions/list?limit=${limit}`, {
    headers: await getHeaders(),
  });
  return handleResponse(res);
}

export async function getSession(id) {
  const res = await fetch(`${API}/sessions/${id}`, {
    headers: await getHeaders(),
  });
  return handleResponse(res);
}