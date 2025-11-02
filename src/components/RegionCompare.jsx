import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './RegionCompare.css';
import { endemicSpeciesByRegion } from '../data/biodiversityData';

const RegionCompare = () => {
  const [region1, setRegion1] = useState('Hokkaido');
  const [region2, setRegion2] = useState('Okinawa');
  const [comparisonView, setComparisonView] = useState('radar');

  const regions = endemicSpeciesByRegion.map(r => r.region);

  const getRegionData = (regionName) => {
    return endemicSpeciesByRegion.find(r => r.region === regionName);
  };

  const data1 = getRegionData(region1);
  const data2 = getRegionData(region2);

  // Prepare radar chart data
  const radarData = [
    {
      subject: 'Mammals',
      [region1]: data1?.mammals || 0,
      [region2]: data2?.mammals || 0,
      fullMark: 30
    },
    {
      subject: 'Birds',
      [region1]: data1?.birds || 0,
      [region2]: data2?.birds || 0,
      fullMark: 40
    },
    {
      subject: 'Reptiles',
      [region1]: data1?.reptiles || 0,
      [region2]: data2?.reptiles || 0,
      fullMark: 25
    },
    {
      subject: 'Amphibians',
      [region1]: data1?.amphibians || 0,
      [region2]: data2?.amphibians || 0,
      fullMark: 20
    }
  ];

  // Prepare bar chart data
  const barData = [
    {
      category: 'Mammals',
      [region1]: data1?.mammals || 0,
      [region2]: data2?.mammals || 0
    },
    {
      category: 'Birds',
      [region1]: data1?.birds || 0,
      [region2]: data2?.birds || 0
    },
    {
      category: 'Reptiles',
      [region1]: data1?.reptiles || 0,
      [region2]: data2?.reptiles || 0
    },
    {
      category: 'Amphibians',
      [region1]: data1?.amphibians || 0,
      [region2]: data2?.amphibians || 0
    }
  ];

  const calculateTotal = (data) => {
    if (!data) return 0;
    return data.mammals + data.birds + data.reptiles + data.amphibians;
  };

  const total1 = calculateTotal(data1);
  const total2 = calculateTotal(data2);

  const calculateDifference = (val1, val2) => {
    const diff = val1 - val2;
    const percentage = val2 !== 0 ? ((diff / val2) * 100).toFixed(1) : 0;
    return { diff, percentage };
  };

  const getDominantCategory = (data) => {
    if (!data) return { name: 'N/A', count: 0 };
    const categories = [
      { name: 'Mammals', count: data.mammals },
      { name: 'Birds', count: data.birds },
      { name: 'Reptiles', count: data.reptiles },
      { name: 'Amphibians', count: data.amphibians }
    ];
    return categories.reduce((max, cat) => cat.count > max.count ? cat : max);
  };

  const swapRegions = () => {
    const temp = region1;
    setRegion1(region2);
    setRegion2(temp);
  };

  return (
    <div className="region-compare-container">
      <div className="compare-header">
        <h2>⚖️ Region Comparison Tool</h2>
        <p>Compare biodiversity metrics between any two regions in Japan</p>
      </div>

      <div className="region-selector-row">
        <div className="region-selector">
          <label>Region 1</label>
          <select value={region1} onChange={(e) => setRegion1(e.target.value)}>
            {regions.map(r => (
              <option key={r} value={r} disabled={r === region2}>{r}</option>
            ))}
          </select>
        </div>

        <button className="swap-btn" onClick={swapRegions} title="Swap regions">
          ⇄
        </button>

        <div className="region-selector">
          <label>Region 2</label>
          <select value={region2} onChange={(e) => setRegion2(e.target.value)}>
            {regions.map(r => (
              <option key={r} value={r} disabled={r === region1}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={`view-btn ${comparisonView === 'radar' ? 'active' : ''}`}
          onClick={() => setComparisonView('radar')}
        >
          📡 Radar View
        </button>
        <button
          className={`view-btn ${comparisonView === 'bar' ? 'active' : ''}`}
          onClick={() => setComparisonView('bar')}
        >
          📊 Bar View
        </button>
        <button
          className={`view-btn ${comparisonView === 'table' ? 'active' : ''}`}
          onClick={() => setComparisonView('table')}
        >
          📋 Table View
        </button>
      </div>

      {comparisonView === 'radar' && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" style={{ fontSize: '14px' }} />
              <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
              <Radar name={region1} dataKey={region1} stroke="#667eea" fill="#667eea" fillOpacity={0.6} />
              <Radar name={region2} dataKey={region2} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {comparisonView === 'bar' && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={region1} fill="#667eea" />
              <Bar dataKey={region2} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {comparisonView === 'table' && (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>{region1}</th>
                <th>{region2}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🦊 Mammals</td>
                <td>{data1?.mammals || 0}</td>
                <td>{data2?.mammals || 0}</td>
                <td className={data1?.mammals > data2?.mammals ? 'positive' : 'negative'}>
                  {calculateDifference(data1?.mammals || 0, data2?.mammals || 0).diff > 0 ? '+' : ''}
                  {calculateDifference(data1?.mammals || 0, data2?.mammals || 0).diff}
                  <span className="percentage">
                    ({calculateDifference(data1?.mammals || 0, data2?.mammals || 0).percentage}%)
                  </span>
                </td>
              </tr>
              <tr>
                <td>🦅 Birds</td>
                <td>{data1?.birds || 0}</td>
                <td>{data2?.birds || 0}</td>
                <td className={data1?.birds > data2?.birds ? 'positive' : 'negative'}>
                  {calculateDifference(data1?.birds || 0, data2?.birds || 0).diff > 0 ? '+' : ''}
                  {calculateDifference(data1?.birds || 0, data2?.birds || 0).diff}
                  <span className="percentage">
                    ({calculateDifference(data1?.birds || 0, data2?.birds || 0).percentage}%)
                  </span>
                </td>
              </tr>
              <tr>
                <td>🦎 Reptiles</td>
                <td>{data1?.reptiles || 0}</td>
                <td>{data2?.reptiles || 0}</td>
                <td className={data1?.reptiles > data2?.reptiles ? 'positive' : 'negative'}>
                  {calculateDifference(data1?.reptiles || 0, data2?.reptiles || 0).diff > 0 ? '+' : ''}
                  {calculateDifference(data1?.reptiles || 0, data2?.reptiles || 0).diff}
                  <span className="percentage">
                    ({calculateDifference(data1?.reptiles || 0, data2?.reptiles || 0).percentage}%)
                  </span>
                </td>
              </tr>
              <tr>
                <td>🐸 Amphibians</td>
                <td>{data1?.amphibians || 0}</td>
                <td>{data2?.amphibians || 0}</td>
                <td className={data1?.amphibians > data2?.amphibians ? 'positive' : 'negative'}>
                  {calculateDifference(data1?.amphibians || 0, data2?.amphibians || 0).diff > 0 ? '+' : ''}
                  {calculateDifference(data1?.amphibians || 0, data2?.amphibians || 0).diff}
                  <span className="percentage">
                    ({calculateDifference(data1?.amphibians || 0, data2?.amphibians || 0).percentage}%)
                  </span>
                </td>
              </tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>{total1}</strong></td>
                <td><strong>{total2}</strong></td>
                <td className={total1 > total2 ? 'positive' : 'negative'}>
                  <strong>
                    {calculateDifference(total1, total2).diff > 0 ? '+' : ''}
                    {calculateDifference(total1, total2).diff}
                  </strong>
                  <span className="percentage">
                    ({calculateDifference(total1, total2).percentage}%)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="insights-section">
        <h3>📊 Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🏆</div>
            <div className="insight-content">
              <h4>Higher Total Biodiversity</h4>
              <p className="insight-value">
                {total1 > total2 ? region1 : region2}
              </p>
              <p className="insight-detail">
                {Math.max(total1, total2)} total endemic species
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🌟</div>
            <div className="insight-content">
              <h4>Dominant Category</h4>
              <p className="insight-value">{getDominantCategory(data1).name}</p>
              <p className="insight-detail">
                in {region1} ({getDominantCategory(data1).count} species)
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h4>Biodiversity Gap</h4>
              <p className="insight-value">
                {Math.abs(calculateDifference(total1, total2).percentage)}%
              </p>
              <p className="insight-detail">
                Difference between regions
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🌈</div>
            <div className="insight-content">
              <h4>Most Diverse</h4>
              <p className="insight-value">
                {data1?.birds + data1?.reptiles > data2?.birds + data2?.reptiles ? region1 : region2}
              </p>
              <p className="insight-detail">
                For birds & reptiles combined
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCompare;
