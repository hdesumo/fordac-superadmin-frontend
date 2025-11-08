"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Activity = {
  action: string;
  created_at: string;
};

export default function ActivityChart({ data }: { data: Activity[] }) {
  // Grouper par jour
  const chartData = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((a) => {
      const date = new Date(a.created_at).toLocaleDateString("fr-FR");
      map.set(date, (map.get(date) || 0) + 1);
    });
    return Array.from(map.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-3">📊 Évolution des activités</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
