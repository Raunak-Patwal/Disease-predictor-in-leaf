import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#e11d48", "#10b981"];

const getChartData = (severity) => {
  const percent = parseFloat(severity);
  if (!isNaN(percent) && percent >= 0 && percent <= 100) {
    return [
      { name: "Infected", value: percent },
      { name: "Healthy", value: 100 - percent },
    ];
  }

  const s = severity?.toLowerCase() || "";
  if (s.includes("mild")) return [{ name: "Infected", value: 20 }, { name: "Healthy", value: 80 }];
  if (s.includes("moderate")) return [{ name: "Infected", value: 50 }, { name: "Healthy", value: 50 }];
  if (s.includes("severe")) return [{ name: "Infected", value: 80 }, { name: "Healthy", value: 20 }];

  return [{ name: "Healthy", value: 100 }];
};

function ImageComparison({ severity }) {
  const chartData = useMemo(() => getChartData(severity), [severity]);

  return (
    <motion.div
      className="flex justify-center mb-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-xs">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default ImageComparison;
