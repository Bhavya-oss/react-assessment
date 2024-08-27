import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const DashBoardBarChart = ({ data }) => {
  // Ensure data is available and is of the correct type
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  // Transform the data into a format compatible with recharts
  const barData = [
    {
      Critical: data.find((d) => d.label === "critical")?.value || 0,
      High: data.find((d) => d.label === "high")?.value || 0,
      Total: data.find((d) => d.label === "totalImages")?.value || 0,
      Mild: data.find((d) => d.label === "mild")?.value || 0,
    },
  ];

  return (
    <BarChart width={400} height={40} data={barData} layout="vertical">
      <CartesianGrid strokeDasharray="4 4" strokeOpacity={0} />
      <XAxis type="number" hide /> {/* Hide X-axis */}
      <YAxis type="category" dataKey="name" hide /> {/* Hide Y-axis */}
      <Legend />
      <Bar dataKey="Critical" stackId="a" fill="#ff8042" />
      <Bar dataKey="High" stackId="a" fill="#ffbb28" />
      <Bar dataKey="Total" stackId="a" fill="#82ca9d" />
      <Bar dataKey="Mild" stackId="a" fill="#ff8042" />
    </BarChart>
  );
};

export default DashBoardBarChart;
