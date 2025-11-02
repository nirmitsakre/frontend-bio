import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Timeline.css';

const Timeline = () => {
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timelineData = [
    {
      year: 2010,
      endemicSpecies: 421,
      nationalParks: 29,
      protectedAreas: 1245,
      conservationFunding: 45
    },
    {
      year: 2012,
      endemicSpecies: 428,
      nationalParks: 30,
      protectedAreas: 1312,
      conservationFunding: 52
    },
    {
      year: 2014,
      endemicSpecies: 435,
      nationalParks: 31,
      protectedAreas: 1389,
      conservationFunding: 61
    },
    {
      year: 2016,
      endemicSpecies: 442,
      nationalParks: 32,
      protectedAreas: 1456,
      conservationFunding: 68
    },
    {
      year: 2018,
      endemicSpecies: 447,
      nationalParks: 33,
      protectedAreas: 1523,
      conservationFunding: 78
    },
    {
      year: 2020,
      endemicSpecies: 451,
      nationalParks: 33,
      protectedAreas: 1598,
      conservationFunding: 84
    },
    {
      year: 2022,
      endemicSpecies: 454,
      nationalParks: 34,
      protectedAreas: 1654,
      conservationFunding: 91
    },
    {
      year: 2024,
      endemicSpecies: 456,
      nationalParks: 34,
      protectedAreas: 1712,
      conservationFunding: 98
    }
  ];

  const milestones = [
    { year: 2010, event: '🌿 Aichi Biodiversity Targets adopted', color: '#10b981' },
    { year: 2014, event: '🗾 Ogasawara Islands protection expanded', color: '#3b82f6' },
    { year: 2018, event: '🦊 Tsushima Leopard Cat conservation program', color: '#f59e0b' },
    { year: 2021, event: '🌊 Amami-Oshima UNESCO World Heritage', color: '#8b5cf6' },
    { year: 2024, event: '🎯 30x30 Conservation Target milestone', color: '#ec4899' }
  ];

  const metrics = [
    { id: 'all', name: 'All Metrics', icon: '📊' },
    { id: 'species', name: 'Endemic Species', icon: '🦋' },
    { id: 'parks', name: 'National Parks', icon: '🏞️' },
    { id: 'areas', name: 'Protected Areas', icon: '🛡️' },
    { id: 'funding', name: 'Conservation Funding', icon: '💰' }
  ];

  const getLineConfig = (metric) => {
    const configs = {
      all: [
        { dataKey: 'endemicSpecies', stroke: '#10b981', name: 'Endemic Species' },
        { dataKey: 'nationalParks', stroke: '#3b82f6', name: 'National Parks' },
        { dataKey: 'protectedAreas', stroke: '#f59e0b', name: 'Protected Areas (×10)' },
        { dataKey: 'conservationFunding', stroke: '#ec4899', name: 'Funding (¥M)' }
      ],
      species: [{ dataKey: 'endemicSpecies', stroke: '#10b981', name: 'Endemic Species', strokeWidth: 3 }],
      parks: [{ dataKey: 'nationalParks', stroke: '#3b82f6', name: 'National Parks', strokeWidth: 3 }],
      areas: [{ dataKey: 'protectedAreas', stroke: '#f59e0b', name: 'Protected Areas', strokeWidth: 3 }],
      funding: [{ dataKey: 'conservationFunding', stroke: '#ec4899', name: 'Conservation Funding (¥M)', strokeWidth: 3 }]
    };
    return configs[metric] || configs.all;
  };

  // Transform data for better visualization when showing all metrics
  const transformedData = selectedMetric === 'all'
    ? timelineData.map(d => ({
        ...d,
        protectedAreas: Math.round(d.protectedAreas / 10) // Scale down for better visualization
      }))
    : timelineData;

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <div>
          <h2>📈 Biodiversity Progress Timeline</h2>
          <p>Track Japan's conservation milestones from 2010 to 2024</p>
        </div>
      </div>

      <div className="metric-filters">
        {metrics.map(metric => (
          <button
            key={metric.id}
            className={`metric-btn ${selectedMetric === metric.id ? 'active' : ''}`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <span className="metric-icon">{metric.icon}</span>
            <span className="metric-name">{metric.name}</span>
          </button>
        ))}
      </div>

      <div className="timeline-chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              style={{ fontSize: '14px' }}
            />
            <YAxis stroke="#64748b" style={{ fontSize: '14px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            {getLineConfig(selectedMetric).map((config, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth || 2}
                name={config.name}
                dot={{ r: 5, fill: config.stroke }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="milestones-section">
        <h3>🎯 Key Conservation Milestones</h3>
        <div className="milestones-timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="milestone" style={{ borderLeftColor: milestone.color }}>
              <div className="milestone-year" style={{ color: milestone.color }}>
                {milestone.year}
              </div>
              <div className="milestone-event">{milestone.event}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-stats">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">+8.3%</div>
            <div className="stat-label">Endemic Species Growth</div>
            <div className="stat-period">2010-2024</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏞️</div>
          <div className="stat-content">
            <div className="stat-value">+5</div>
            <div className="stat-label">New National Parks</div>
            <div className="stat-period">Since 2010</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛡️</div>
          <div className="stat-content">
            <div className="stat-value">+37.5%</div>
            <div className="stat-label">Protected Areas</div>
            <div className="stat-period">2010-2024</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">+117.8%</div>
            <div className="stat-label">Conservation Funding</div>
            <div className="stat-period">2010-2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
