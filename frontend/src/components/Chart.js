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
import AreaChartComponent from "./Charts/AreaChartComponent";
import BarChartComponent from "./Charts/BarChartComponent";
import ComposedChartComponent from "./Charts/ComposedChartComponent";
import LineChartComponent from "./Charts/LineChartComponent";
import PieChartComponent from "./Charts/PieChartComponent";
import RadarChartComponent from "./Charts/RadarChartComponent";
import RadialBarChartComponent from "./Charts/RadialBarChartComponent";
import ScatterChartComponent from "./Charts/ScatterChartComponent";
import TreeMapComponent from "./Charts/TreeMapComponent";

const Chart = ({ service, chartPicked, inDashboard }) => {
  if (!chartPicked) {
    chartPicked = "BarChart";
  }

  const choosenChart = () => {
    switch (chartPicked) {
      case "BarChart":
        return (
          <BarChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "AreaChart":
        return (
          <AreaChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "LineChart":
        return (
          <LineChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "ComposedChart":
        return (
          <ComposedChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "ScatterChart":
        return (
          <ScatterChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "PieChart":
        return (
          <PieChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "RadarChart":
        return (
          <RadarChartComponent service={service} inDashboard={inDashboard} />
        );
        break;
      case "RadialBarChart":
        return <RadialBarChartComponent service={service} />;
        break;
      case "TreeMap":
        return <TreeMapComponent service={service} />;
        break;
    }
  };
  return (
    <Card className="my-3 p-3 rounded">
      {choosenChart()}
      <Card.Body>
        <Card.Title as="div">
          <strong>{service.provider}</strong>
        </Card.Title>

        {inDashboard ? (
          <>
            <Link to={`/services/${service._id}`}>
              <Card.Text as="h3">{service.name}</Card.Text>
            </Link>
            <Card.Text as="p">
              No. of reports: <strong>{service.nuOfReports}</strong>
            </Card.Text>
          </>
        ) : (
          <Card.Text as="h3">{service.name}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Chart;
