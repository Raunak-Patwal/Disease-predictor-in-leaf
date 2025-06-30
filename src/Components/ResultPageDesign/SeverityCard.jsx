import { useEffect, useState } from "react";

function SeverityCard({ severity }) {
  if (!severity) return null;

  const percent = parseFloat(severity);
  const displayValue = !isNaN(percent) ? `${percent}%` : severity;

  const [animatedWidth, setAnimatedWidth] = useState(0);

  const getSeverityLevel = (val) => {
    if (val <= 30) return { label: "Low", color: "bg-green-500" };
    if (val <= 70) return { label: "Moderate", color: "bg-yellow-400" };
    return { label: "High", color: "bg-red-500" };
  };

  const level = !isNaN(percent) ? getSeverityLevel(percent) : null;

  useEffect(() => {
    if (!isNaN(percent)) {
      setTimeout(() => setAnimatedWidth(percent), 300); // delay for smooth entrance
    }
  }, [percent]);

  return (
    <div className="p-6 mb-10 text-center border shadow-md bg-white/10 border-white/20 rounded-xl">
      <h2 className="mb-3 text-3xl font-bold text-pink-300">🌡️ Severity Level</h2>
      <p className="text-4xl font-semibold text-white drop-shadow-lg">{displayValue}</p>

      {level && (
        <>
          <div className="mt-4 text-white/80">{level.label} Infection</div>
          <div className="w-full h-6 max-w-md mx-auto mt-2 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full transition-all duration-1000 ease-out ${level.color}`}
              style={{ width: `${animatedWidth}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default SeverityCard;
