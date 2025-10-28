// src/services/backendApi.js
import { BASE_URL } from "../config";
export async function pingBackend() {
  try {
    const response = await fetch(`${BASE_URL}/api/test`); // backend endpoint
    const data = await response.text();
    console.log("✅ Response from backend:", data);
    return data;
  } catch (error) {
    console.error("❌ Error connecting to backend:", error);
    return "Backend not reachable";
  }
}
