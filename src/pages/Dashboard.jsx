import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import MetricsChart from "../components/MetricsChart";
import { pingBackend } from "../services/backendApi";

export default function Dashboard() {
  const stats = [
    { title: "Interviews Taken", value: 12 },
    { title: "Avg Accuracy", value: "84%" },
    { title: "Avg Confidence", value: "76%" },
    { title: "Problems Solved", value: 18 },
  ];

  const [backendMsg, setBackendMsg] = useState("Checking connection...");

  useEffect(() => {
    pingBackend().then(setBackendMsg);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[200px] pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Performance Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Track your interview performance and improve with AI feedback.
          </p>
        </div>

        {/* Backend status */}
        <div className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <span className="text-gray-400">Backend Status</span>

          <span className="text-green-400 font-medium">
            {backendMsg}
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {stats.map((s, i) => (
            <DashboardCard key={i} {...s}/>
          ))}

        </div>

        {/* Chart section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold mb-6">
            Interview Performance Over Time
          </h3>

          <MetricsChart />

        </div>

        {/* Coming soon */}
        <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">

          <h3 className="text-xl font-semibold mb-2">
            Coming Soon
          </h3>

          <p className="text-gray-400">
            AI-evaluated coding challenges with hints and real interview scoring.
          </p>

        </div>

      </div>

    </div>
  );
}