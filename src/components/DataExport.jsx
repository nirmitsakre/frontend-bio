import React, { useState } from 'react';
import './DataExport.css';
import { endemicSpeciesByRegion } from '../data/biodiversityData';

const DataExport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');

  const exportToCSV = () => {
    let csv = 'Region,Mammals,Birds,Reptiles,Amphibians\n';

    endemicSpeciesByRegion.forEach(region => {
      csv += `${region.region},${region.mammals},${region.birds},${region.reptiles},${region.amphibians}\n`;
    });

    // Add totals
    const totals = {
      mammals: endemicSpeciesByRegion.reduce((sum, r) => sum + r.mammals, 0),
      birds: endemicSpeciesByRegion.reduce((sum, r) => sum + r.birds, 0),
      reptiles: endemicSpeciesByRegion.reduce((sum, r) => sum + r.reptiles, 0),
      amphibians: endemicSpeciesByRegion.reduce((sum, r) => sum + r.amphibians, 0)
    };
    csv += `\nTOTAL,${totals.mammals},${totals.birds},${totals.reptiles},${totals.amphibians}\n`;

    downloadFile(csv, 'japan-biodiversity-data.csv', 'text/csv');
  };

  const exportToJSON = () => {
    const totals = {
      mammals: endemicSpeciesByRegion.reduce((sum, r) => sum + r.mammals, 0),
      birds: endemicSpeciesByRegion.reduce((sum, r) => sum + r.birds, 0),
      reptiles: endemicSpeciesByRegion.reduce((sum, r) => sum + r.reptiles, 0),
      amphibians: endemicSpeciesByRegion.reduce((sum, r) => sum + r.amphibians, 0)
    };

    const data = {
      exportDate: new Date().toISOString(),
      summary: {
        totalSpecies: 6852,
        endemicSpecies: 456,
        nationalParks: 34,
        threatenedSpecies: 343
      },
      regionalData: endemicSpeciesByRegion,
      totals: totals
    };

    const json = JSON.stringify(data, null, 2);
    downloadFile(json, 'japan-biodiversity-data.json', 'application/json');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToJSON();
    }
    setIsOpen(false);
  };

  return (
    <>
      <button className="export-button" onClick={() => setIsOpen(true)}>
        📥 Export Data
      </button>

      {isOpen && (
        <div className="export-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="export-modal" onClick={(e) => e.stopPropagation()}>
            <div className="export-header">
              <h3>📥 Export Biodiversity Data</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="export-content">
              <p>Choose your preferred format to download the Japan biodiversity dataset:</p>

              <div className="format-options">
                <label className={`format-option ${exportFormat === 'csv' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={(e) => setExportFormat(e.target.value)}
                  />
                  <div className="format-details">
                    <strong>📊 CSV Format</strong>
                    <span>Excel-compatible spreadsheet format</span>
                  </div>
                </label>

                <label className={`format-option ${exportFormat === 'json' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="json"
                    checked={exportFormat === 'json'}
                    onChange={(e) => setExportFormat(e.target.value)}
                  />
                  <div className="format-details">
                    <strong>🔧 JSON Format</strong>
                    <span>Developer-friendly data format</span>
                  </div>
                </label>
              </div>

              <div className="export-preview">
                <h4>📦 What's included:</h4>
                <ul>
                  <li>Regional endemic species data (9 regions)</li>
                  <li>Species counts by category (mammals, birds, reptiles, amphibians)</li>
                  <li>Total calculations</li>
                  {exportFormat === 'json' && <li>Summary statistics & metadata</li>}
                </ul>
              </div>

              <button className="export-download-btn" onClick={handleExport}>
                ⬇️ Download {exportFormat.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataExport;
