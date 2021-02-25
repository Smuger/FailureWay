import React from "react";
import {
  Treemap,
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

const TreeMapComponent = ({ service, inDashboard }) => {
  return (
    <>
      {inDashboard ? (
        <Link to={`/services/${service._id}`}>
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              data={service.data}
              ratio={4 / 3}
              dataKey="minor"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              stroke="#fff"
              fill="#ffc100"
            />
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              data={service.data}
              ratio={4 / 3}
              dataKey="major"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              stroke="#fff"
              fill="#260505"
            />
          </ResponsiveContainer>
        </Link>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              data={service.data}
              ratio={4 / 3}
              dataKey="minor"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              stroke="#fff"
              fill="#ffc100"
            />
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              title="Weekly cumulative downtime"
              width={600}
              height={300}
              data={service.data}
              ratio={4 / 3}
              dataKey="major"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              stroke="#fff"
              fill="#260505"
            />
          </ResponsiveContainer>
        </>
      )}
    </>
  );
};

export default TreeMapComponent;
