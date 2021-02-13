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
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Chart = ({ service }) => {
  console.log("Calling from component: " + service.name);
  console.log("Calling from component: " + JSON.stringify(service.data));

  // const data = [
  //   { name: "Monday", minor: 100, major: 120 },
  //   { name: "Tuesday", minor: 21, major: 130 },
  //   { name: "Wednesday", minor: 12, major: 130 },
  //   { name: "Thursday", minor: 332, major: 50 },
  //   { name: "Friday", minor: 100, major: 80 },
  //   { name: "Saturday", minor: 120, major: 60 },
  //   { name: "Sunday", minor: 30, major: 90 },
  // ];
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/services/${service._id}`}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={600}
            height={300}
            data={service.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelStyle={{ fontFamily: "Helvetica", color: "#455a64" }}
            />
            <Legend />
            <Bar dataKey="minor" fill="#ffc100" background={{ fill: "#eee" }} />
            <Bar dataKey="major" fill="#260505" />
          </BarChart>
        </ResponsiveContainer>
      </Link>

      <Card.Body>
        <Link to={`/services/${service._id}`}>
          <Card.Title as="div">
            <strong>{service.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">{service.provider}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Chart;
