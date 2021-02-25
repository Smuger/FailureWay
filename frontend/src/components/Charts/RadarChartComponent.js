import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RadarChartComponent = ({ service, inDashboard }) => {
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              data={service.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <PolarGrid />
              <PolarRadiusAxis />
              <PolarAngleAxis dataKey="name" />
              <Radar
                name="Mike"
                dataKey="minor"
                stroke="#ffc100"
                fill="#ffc100"
                fillOpacity={0.6}
              />
              <Radar
                name="Lily"
                dataKey="major"
                stroke="#260505"
                fill="#260505"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Link>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart
            title="Weekly cumulative downtime"
            width={600}
            height={300}
            data={service.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <PolarGrid />
            <PolarRadiusAxis />
            <PolarAngleAxis dataKey="name" />
            <Radar
              name="Mike"
              dataKey="minor"
              stroke="#ffc100"
              fill="#ffc100"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
              dataKey="major"
              stroke="#260505"
              fill="#260505"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default RadarChartComponent;
