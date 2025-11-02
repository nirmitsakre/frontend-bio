import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  endemicSpeciesByRegion,
  monthlyBirdMigration,
  protectedAreasSize,
} from '../data/biodiversityData';

const BarCharts = () => {
  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Endemic Species by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={endemicSpeciesByRegion}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="region"
              angle={-45}
              textAnchor="end"
              height={80}
              stroke="#555"
            />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Bar dataKey="mammals" stackId="a" fill="#D32F2F" />
            <Bar dataKey="birds" stackId="a" fill="#F57C00" />
            <Bar dataKey="reptiles" stackId="a" fill="#FBC02D" />
            <Bar dataKey="amphibians" stackId="a" fill="#388E3C" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Monthly Bird Migration Patterns</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyBirdMigration}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Bar dataKey="arrivals" fill="#2196F3" />
            <Bar dataKey="departures" fill="#FF5722" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Protected Areas Coverage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={protectedAreasSize}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="type"
              angle={-45}
              textAnchor="end"
              height={100}
              stroke="#555"
            />
            <YAxis stroke="#555" label={{ value: 'Area (km²)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="area" fill="#4CAF50" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
