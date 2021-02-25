import React from "react";
import {
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const PieChartComponent = ({ service, inDashboard }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <Pie
                data={service.data}
                dataKey="major"
                innerRadius={70}
                outerRadius={150}
                fill="#260505"
                label
              />
              <Pie
                data={service.data}
                dataKey="minor"
                outerRadius={60}
                fill="#FFC100"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Link>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart
            title="Weekly cumulative downtime"
            width={600}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Pie
              data={service.data}
              dataKey="major"
              innerRadius={70}
              outerRadius={150}
              fill="#260505"
              label
            />
            <Pie
              data={service.data}
              dataKey="minor"
              outerRadius={60}
              fill="#FFC100"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PieChartComponent;
