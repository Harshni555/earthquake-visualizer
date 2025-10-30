import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

type EarthquakeChartsProps = {
  data: any[];
};

const COLORS = ["#22c55e", "#facc15", "#f97316", "#ef4444", "#7c3aed"];

export default function EarthquakeCharts({ data }: EarthquakeChartsProps) {
  // 🧮 Prepare chart data dynamically (memoized for performance)
  const buckets = useMemo(() => {
    const ranges = [
      { range: "0–1", count: 0 },
      { range: "1–2", count: 0 },
      { range: "2–3", count: 0 },
      { range: "3–5", count: 0 },
      { range: "5+", count: 0 },
    ];

    data.forEach((quake) => {
      const mag = quake.properties?.mag || 0;
      if (mag < 1) ranges[0].count++;
      else if (mag < 2) ranges[1].count++;
      else if (mag < 3) ranges[2].count++;
      else if (mag < 5) ranges[3].count++;
      else ranges[4].count++;
    });

    return ranges;
  }, [data]);

  return (
    <motion.div
      key={data.length} // triggers smooth reanimation when data updates
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 mt-4"
    >
      {/* 📊 Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-48 bg-white/10 p-3 rounded-lg border border-gray-600 shadow-md"
      >
        <h4 className="text-sm font-medium text-center mb-2">
          Magnitude Distribution (Bar)
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={buckets}>
            <XAxis dataKey="range" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                background: "rgba(30,41,59,0.9)",
                color: "#fff",
                borderRadius: "6px",
                border: "1px solid #475569",
              }}
            />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {buckets.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 🥧 Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-48 bg-white/10 p-3 rounded-lg border border-gray-600 shadow-md"
      >
        <h4 className="text-sm font-medium text-center mb-2">
          Magnitude Distribution (Pie)
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={buckets}
              dataKey="count"
              nameKey="range"
              outerRadius={70}
              label
              isAnimationActive={true}
              animationDuration={1000}
            >
              {buckets.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(30,41,59,0.9)",
                color: "#fff",
                borderRadius: "6px",
                border: "1px solid #475569",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
