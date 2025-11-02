import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ onThemeToggle, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const handleExport = (format) => {
    alert(`Exporting data as ${format}... (Feature demonstration)`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-text">Japan Bio Dashboard</span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <button
            className="nav-link"
            onClick={() => scrollToSection('stats')}
          >
            📊 Statistics
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection('scatter')}
          >
            📈 Distributions
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection('bar')}
          >
            📊 Regional Data
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection('map')}
          >
            🗺️ Map
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection('gallery')}
          >
            🦋 Gallery
          </button>

          <div className="nav-divider"></div>

          <button
            className="nav-link export-btn"
            onClick={() => handleExport('CSV')}
          >
            💾 Export CSV
          </button>

          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
