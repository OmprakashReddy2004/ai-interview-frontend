import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import MetricsChart from "../components/MetricsChart";
import { pingBackend } from "../services/backendApi"; // ✅ new import

export default function Dashboard() {
  const stats = [
    { title: "Interviews Taken", value: 12, color: "bg-blue-500" },
    { title: "Avg Accuracy", value: "84%", color: "bg-green-500" },
    { title: "Avg Confidence", value: "76%", color: "bg-purple-500" },
    { title: "Coding Problems Solved", value: 18, color: "bg-orange-500" },
  ];

  const [backendMsg, setBackendMsg] = useState("Checking connection...");

  // 🔹 Step 2: Call backend on component mount
  useEffect(() => {
    pingBackend().then(setBackendMsg);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📈 Your Performance Dashboard
      </h2>

      {/* 🔹 Backend connection result */}
      <div className="bg-gray-100 p-4 rounded-xl mb-8 text-center shadow">
        <p className="text-gray-700 font-semibold">Backend Connection:</p>
        <p className="text-green-700 font-medium">{backendMsg}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <DashboardCard key={i} {...s} />
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Interview Performance Over Time
        </h3>
        <MetricsChart />
      </div>

      {/* Future Section */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">🧩 Coming Soon</h3>
        <p className="text-gray-600">
          LeetCode-style coding challenges with AI evaluation and hints!
        </p>
      </div>
    </div>
  );
}
