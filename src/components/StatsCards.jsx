import React, { useState, useEffect } from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const [counts, setCounts] = useState({
    species: 0,
    endemic: 0,
    protected: 0,
    hotspots: 0
  });

  const finalValues = {
    species: 6852,
    endemic: 456,
    protected: 34,
    hotspots: 8
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        species: Math.floor(finalValues.species * progress),
        endemic: Math.floor(finalValues.endemic * progress),
        protected: Math.floor(finalValues.protected * progress),
        hotspots: Math.floor(finalValues.hotspots * progress)
      });

      if (currentStep >= steps) {
        setCounts(finalValues);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: '🦋',
      label: 'Total Species',
      value: counts.species.toLocaleString(),
      color: '#2E7D32',
      description: 'Documented species in Japan'
    },
    {
      icon: '🌸',
      label: 'Endemic Species',
      value: counts.endemic.toLocaleString(),
      color: '#D32F2F',
      description: 'Species unique to Japan'
    },
    {
      icon: '🏞️',
      label: 'National Parks',
      value: counts.protected,
      color: '#1976D2',
      description: 'Protected natural areas'
    },
    {
      icon: '📍',
      label: 'Biodiversity Hotspots',
      value: counts.hotspots,
      color: '#F57C00',
      description: 'Key conservation areas'
    }
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
