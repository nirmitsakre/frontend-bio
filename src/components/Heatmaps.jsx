import React from 'react';
import {
  seasonalBiodiversity,
  habitatHealthMatrix,
} from '../data/biodiversityData';
import './Heatmaps.css';

const Heatmaps = () => {
  // Get unique months and regions for seasonal heatmap
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const regions = ['Hokkaido', 'Honshu', 'Kyushu', 'Okinawa'];

  // Get unique habitats and indicators for habitat health heatmap
  const habitats = ['Forests', 'Wetlands', 'Coastal', 'Mountains', 'Urban'];
  const indicators = ['Canopy Coverage', 'Soil Quality', 'Water Availability', 'Species Richness'];

  // Create matrix for seasonal biodiversity
  const seasonalMatrix = {};
  seasonalBiodiversity.forEach(item => {
    if (!seasonalMatrix[item.region]) {
      seasonalMatrix[item.region] = {};
    }
    seasonalMatrix[item.region][item.month] = item.activity;
  });

  // Create matrix for habitat health
  const habitatMatrix = {};
  habitatHealthMatrix.forEach(item => {
    if (!habitatMatrix[item.habitat]) {
      habitatMatrix[item.habitat] = {};
    }
    habitatMatrix[item.habitat][item.indicator] = item.value;
  });

  // Get color based on value (0-10 scale) - Green theme for biodiversity
  const getColor = (value) => {
    const colors = [
      '#f1f8e9', // Very light green - 0
      '#dcedc8', // Light green - 1
      '#c5e1a5', // Light-medium green - 2
      '#aed581', // Medium-light green - 3
      '#9ccc65', // Medium green - 4
      '#8bc34a', // Medium-bright green - 5
      '#7cb342', // Bright green - 6
      '#689f38', // Rich green - 7
      '#558b2f', // Deep green - 8
      '#33691e'  // Very deep green - 9
    ];
    return colors[Math.min(Math.floor(value), 9)];
  };

  // Get text color based on background brightness
  const getTextColor = (value) => {
    // Use dark text for values 0-5, white text for values 6-10
    return value >= 6 ? '#ffffff' : '#333333';
  };

  return (
    <div className="charts-grid-2">
      <div className="chart-card">
        <h3>Seasonal Biodiversity Activity</h3>
        <div className="heatmap-container">
          <div className="heatmap">
            <div className="heatmap-grid seasonal">
              <div className="heatmap-corner"></div>
              {months.map(month => (
                <div key={month} className="heatmap-header">{month}</div>
              ))}
              {regions.map(region => (
                <React.Fragment key={region}>
                  <div className="heatmap-label">{region}</div>
                  {months.map(month => {
                    const value = seasonalMatrix[region]?.[month] || 0;
                    return (
                      <div
                        key={`${region}-${month}`}
                        className="heatmap-cell"
                        style={{
                          backgroundColor: getColor(value),
                          color: getTextColor(value)
                        }}
                        title={`${region} - ${month}: ${value}/10`}
                      >
                        <span className="cell-value">{value}</span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Low Activity (0)</span>
            <div className="legend-gradient"></div>
            <span>High Activity (10)</span>
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h3>Habitat Health Indicators</h3>
        <div className="heatmap-container">
          <div className="heatmap">
            <div className="heatmap-grid habitat">
              <div className="heatmap-corner"></div>
              {indicators.map(indicator => (
                <div key={indicator} className="heatmap-header heatmap-header-vertical">
                  {indicator}
                </div>
              ))}
              {habitats.map(habitat => (
                <React.Fragment key={habitat}>
                  <div className="heatmap-label">{habitat}</div>
                  {indicators.map(indicator => {
                    const value = habitatMatrix[habitat]?.[indicator] || 0;
                    return (
                      <div
                        key={`${habitat}-${indicator}`}
                        className="heatmap-cell"
                        style={{
                          backgroundColor: getColor(value),
                          color: getTextColor(value)
                        }}
                        title={`${habitat} - ${indicator}: ${value}/10`}
                      >
                        <span className="cell-value">{value}</span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Poor (0)</span>
            <div className="legend-gradient"></div>
            <span>Excellent (10)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmaps;
