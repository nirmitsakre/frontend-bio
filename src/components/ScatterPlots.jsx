import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';
import {
  speciesByAltitude,
  marineLifeDepth,
  forestBiodiversity,
} from '../data/biodiversityData';

const ScatterPlots = () => {
  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Species Count by Altitude</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              type="number"
              dataKey="altitude"
              name="Altitude"
              unit="m"
              stroke="#555"
            />
            <YAxis
              type="number"
              dataKey="species"
              name="Species"
              stroke="#555"
            />
            <ZAxis range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name="Species by Altitude"
              data={speciesByAltitude}
              fill="#2E7D32"
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Marine Biodiversity by Depth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              type="number"
              dataKey="depth"
              name="Depth"
              unit="m"
              stroke="#555"
            />
            <YAxis
              type="number"
              dataKey="biodiversity"
              name="Biodiversity Index"
              stroke="#555"
            />
            <ZAxis range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name="Marine Life"
              data={marineLifeDepth}
              fill="#0277BD"
              shape="diamond"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Forest Biodiversity by Canopy Height</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              type="number"
              dataKey="canopyHeight"
              name="Canopy Height"
              unit="m"
              stroke="#555"
            />
            <YAxis
              type="number"
              dataKey="species"
              name="Species Count"
              stroke="#555"
            />
            <ZAxis range={[80, 500]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name="Forest Species"
              data={forestBiodiversity}
              fill="#558B2F"
              shape="triangle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScatterPlots;
