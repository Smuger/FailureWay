import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ScatterChartComponent = ({ service, inDashboard }) => {
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
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
              <Tooltip
                labelStyle={{ fontFamily: "Helvetica", color: "#455a64" }}
              />
              <Legend />
              <Line
                dataKey="minor"
                fill="#ffc100"
                background={{ fill: "#eee" }}
              />
              <Line dataKey="major" fill="#260505" />
            </LineChart>
          </ResponsiveContainer>
        </Link>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
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
            <Tooltip
              labelStyle={{ fontFamily: "Helvetica", color: "#455a64" }}
            />
            <Legend />
            <Line
              dataKey="minor"
              fill="#ffc100"
              background={{ fill: "#eee" }}
            />
            <Line dataKey="major" fill="#260505" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ScatterChartComponent;
