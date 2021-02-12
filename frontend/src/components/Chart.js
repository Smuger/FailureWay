import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    { name: "Monday", minor: 100, major: 120, amt: 500 },
    { name: "Tuesday", minor: 21, major: 130, amt: 500 },
    { name: "Wednesday", minor: 12, major: 130, amt: 500 },
    { name: "Thursday", minor: 332, major: 50, amt: 500 },
    { name: "Friday", minor: 100, major: 80, amt: 500 },
    { name: "Saturday", minor: 120, major: 60, amt: 500 },
    { name: "Sunday", minor: 30, major: 90, amt: 500 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip labelStyle={{ fontFamily: "Helvetica", color: "#455a64" }} />
        <Legend />
        <Bar dataKey="minor" fill="#ffc100" background={{ fill: "#eee" }} />
        <Bar dataKey="major" fill="#260505" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
