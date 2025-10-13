import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MetricsChart() {
  const data = [
    { date: "Week 1", accuracy: 70, confidence: 68 },
    { date: "Week 2", accuracy: 75, confidence: 72 },
    { date: "Week 3", accuracy: 82, confidence: 77 },
    { date: "Week 4", accuracy: 88, confidence: 81 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={3} />
        <Line type="monotone" dataKey="confidence" stroke="#9333ea" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
