import React from 'react';
import {
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdvancedCharts = () => {
  // Area chart data - Conservation efforts over time
  const conservationData = [
    { year: '2010', funding: 45, species: 320, area: 28 },
    { year: '2012', funding: 52, species: 335, area: 31 },
    { year: '2014', funding: 58, species: 348, area: 33 },
    { year: '2016', funding: 67, species: 362, area: 35 },
    { year: '2018', funding: 73, species: 378, area: 37 },
    { year: '2020', funding: 82, species: 395, area: 40 },
    { year: '2022', funding: 91, species: 412, area: 43 },
    { year: '2024', funding: 98, species: 428, area: 46 },
  ];

  // Radar chart data - Ecosystem health indicators
  const ecosystemHealth = [
    { indicator: 'Water Quality', score: 85, fullMark: 100 },
    { indicator: 'Air Quality', score: 78, fullMark: 100 },
    { indicator: 'Soil Health', score: 72, fullMark: 100 },
    { indicator: 'Biodiversity', score: 88, fullMark: 100 },
    { indicator: 'Forest Coverage', score: 91, fullMark: 100 },
    { indicator: 'Marine Health', score: 67, fullMark: 100 },
  ];

  // Line chart data - Temperature impact on species
  const temperatureImpact = [
    { temp: 10, species: 280, trend: 275 },
    { temp: 12, species: 320, trend: 310 },
    { temp: 14, species: 380, trend: 375 },
    { temp: 16, species: 420, trend: 415 },
    { temp: 18, species: 450, trend: 445 },
    { temp: 20, species: 470, trend: 465 },
    { temp: 22, species: 460, trend: 470 },
    { temp: 24, species: 430, trend: 460 },
    { temp: 26, species: 390, trend: 430 },
    { temp: 28, species: 340, trend: 380 },
  ];

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Conservation Efforts Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={conservationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSpecies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976D2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1976D2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F57C00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F57C00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="year" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="funding"
              stroke="#2E7D32"
              fillOpacity={1}
              fill="url(#colorFunding)"
              name="Funding (Million ¥)"
            />
            <Area
              type="monotone"
              dataKey="species"
              stroke="#1976D2"
              fillOpacity={1}
              fill="url(#colorSpecies)"
              name="Protected Species"
            />
            <Area
              type="monotone"
              dataKey="area"
              stroke="#F57C00"
              fillOpacity={1}
              fill="url(#colorArea)"
              name="Protected Areas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Ecosystem Health Indicators</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={ecosystemHealth}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="indicator" tick={{ fill: '#555', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#555' }} />
            <Radar
              name="Health Score"
              dataKey="score"
              stroke="#2E7D32"
              fill="#66BB6A"
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Temperature Impact on Species Diversity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureImpact} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="temp"
              stroke="#555"
              label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke="#555"
              label={{ value: 'Species Count', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="species"
              stroke="#D32F2F"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Observed Species"
            />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#1976D2"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="Trend Line"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedCharts;
