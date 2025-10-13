import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MetricsDashboard({ metrics }) {
  const data = [
    { name: "Accuracy", value: metrics.accuracy },
    { name: "Clarity", value: metrics.clarity },
    { name: "Confidence", value: metrics.confidence },
    { name: "Response Time", value: metrics.responseTime },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">📊 Real-Time Metrics</h3>
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
