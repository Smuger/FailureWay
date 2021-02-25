import React from "react";
import {
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RadialBarChartComponent = ({ service, inDashboard }) => {
  const style = {
    top: 0,
    left: 350,
    lineHeight: "24px",
  };
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              innerRadius={20}
              outerRadius={140}
              barSize={10}
              data={service.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
              <RadialBar
                minAngle={15}
                label={{ position: "insideStart", fill: "#fff" }}
                background
                clockWise
                dataKey="name"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </Link>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            title="Weekly cumulative downtime"
            width={600}
            height={300}
            innerRadius={20}
            outerRadius={140}
            barSize={10}
            data={service.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Legend
              iconSize={10}
              width={120}
              height={140}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={style}
            />
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              clockWise
              dataKey="name"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default RadialBarChartComponent;
