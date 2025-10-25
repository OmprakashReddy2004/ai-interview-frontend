// src/services/backendApi.js
export async function pingBackend() {
  try {
    const response = await fetch("http://localhost:8080/api/test"); // backend endpoint
    const data = await response.text();
    console.log("✅ Response from backend:", data);
    return data;
  } catch (error) {
    console.error("❌ Error connecting to backend:", error);
    return "Backend not reachable";
  }
}
