import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AreaChartComponent = ({ service, inDashboard }) => {
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
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
              <Area dataKey="minor" stroke="#ffc100" fill="#ffc100" />
              <Area dataKey="major" stroke="#260505" fill="#260505" />
            </AreaChart>
          </ResponsiveContainer>
        </Link>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
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
            <Area dataKey="minor" stroke="#ffc100" fill="#ffc100" />
            <Area dataKey="major" stroke="#260505" fill="#260505" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default AreaChartComponent;
