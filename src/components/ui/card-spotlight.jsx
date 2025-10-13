// src/components/ui/card-spotlight.jsx

export function CardSpotlight({ className = "", children }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-xl border border-gray-700 transition-all duration-500 hover:shadow-blue-500/30 ${className}`}
    >
      {/* Glowing radial light effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
