import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import StatsCards from './components/StatsCards';
import ScatterPlots from './components/ScatterPlots';
import BarCharts from './components/BarCharts';
import PieCharts from './components/PieCharts';
import Heatmaps from './components/Heatmaps';
import BioMap from './components/BioMap';
import SpeciesGallery from './components/SpeciesGallery';
import AdvancedCharts from './components/AdvancedCharts';
import ChatBot from './components/ChatBot';
import DataExport from './components/DataExport';
import Timeline from './components/Timeline';
import SearchFilter from './components/SearchFilter';
import RegionCompare from './components/RegionCompare';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navigation onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />

      <header className="app-header">
        <h1>🌸 Japan Biodiversity Dashboard 🗾</h1>
        <p>Exploring the Rich Natural Heritage of Japan</p>
        <div style={{ marginTop: '20px' }}>
          <DataExport />
        </div>
      </header>

      <main className="dashboard">
        <section id="stats" className="stats-section">
          <StatsCards />
        </section>

        {/* New Timeline Section */}
        <section id="timeline" className="chart-section">
          <Timeline />
        </section>

        {/* New Region Comparison Section */}
        <section id="compare" className="chart-section">
          <RegionCompare />
        </section>

        {/* New Search & Filter Section */}
        <section id="search" className="chart-section">
          <SearchFilter />
        </section>

        <section id="scatter" className="chart-section">
          <h2>Species Distribution Analysis</h2>
          <ScatterPlots />
        </section>

        <section id="bar" className="chart-section">
          <h2>Regional Biodiversity Metrics</h2>
          <BarCharts />
        </section>

        <section className="chart-section">
          <h2>Advanced Analytics</h2>
          <AdvancedCharts />
        </section>

        <section id="map" className="chart-section full-width">
          <h2>Biodiversity Hotspots Map</h2>
          <BioMap />
        </section>

        <section className="chart-section">
          <h2>Ecosystem & Species Distribution</h2>
          <PieCharts />
        </section>

        <section className="chart-section">
          <h2>Seasonal & Habitat Analysis</h2>
          <Heatmaps />
        </section>

        <section id="gallery" className="chart-section">
          <h2>Notable Species Gallery</h2>
          <SpeciesGallery />
        </section>
      </main>

      <footer className="app-footer">
        <p>Data visualization for educational purposes | Japan Biodiversity 2024</p>
        <p style={{ fontSize: '0.8rem', marginTop: '10px', opacity: 0.8 }}>
          © 2024 Japan Biodiversity Dashboard. All rights reserved.
        </p>
      </footer>

      {/* Chatbot - Always accessible with Voice Input */}
      <ChatBot />
    </div>
  );
}

export default App;
