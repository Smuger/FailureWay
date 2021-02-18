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
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarChartComponent = ({ service }) => {
  return (
    <Link to={`/services/${service._id}`}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          title="Weekly cumulative downtime"
          width={600}
          height={300}
          data={service.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Hours", angle: -90, position: "insideLeft" }}
          />
          <Tooltip labelStyle={{ fontFamily: "Helvetica", color: "#455a64" }} />
          <Legend />
          <Bar dataKey="minor" fill="#ffc100" background={{ fill: "#eee" }} />
          <Bar dataKey="major" fill="#260505" />
        </BarChart>
      </ResponsiveContainer>
    </Link>
  );
};

export default BarChartComponent;
