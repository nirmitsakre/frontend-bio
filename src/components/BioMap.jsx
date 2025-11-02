import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { biodiversityHotspots } from '../data/biodiversityData';
import L from 'leaflet';
import './BioMap.css';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for biodiversity hotspots
const hotspotIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const BioMap = () => {
  // Center of Japan
  const japanCenter = [36.2048, 138.2529];

  // Calculate circle radius based on species count
  const getRadius = (species) => {
    return Math.sqrt(species) * 500; // Scale for visibility
  };

  // Get color based on species count
  const getColor = (species) => {
    if (species > 600) return '#2E7D32';
    if (species > 400) return '#66BB6A';
    if (species > 300) return '#AED581';
    return '#C5E1A5';
  };

  return (
    <div className="map-container">
      <MapContainer
        center={japanCenter}
        zoom={5}
        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {biodiversityHotspots.map((hotspot, index) => (
          <React.Fragment key={index}>
            <Circle
              center={[hotspot.lat, hotspot.lng]}
              radius={getRadius(hotspot.species)}
              pathOptions={{
                color: getColor(hotspot.species),
                fillColor: getColor(hotspot.species),
                fillOpacity: 0.3,
              }}
            />
            <Marker
              position={[hotspot.lat, hotspot.lng]}
              icon={hotspotIcon}
            >
              <Popup>
                <div className="popup-content">
                  <h4>{hotspot.name}</h4>
                  <p><strong>Species Count:</strong> {hotspot.species}</p>
                  <p>{hotspot.description}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>

      <div className="map-legend">
        <h4>Biodiversity Hotspots</h4>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#2E7D32' }}></div>
          <span>600+ species</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#66BB6A' }}></div>
          <span>400-600 species</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#AED581' }}></div>
          <span>300-400 species</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#C5E1A5' }}></div>
          <span>&lt;300 species</span>
        </div>
      </div>
    </div>
  );
};

export default BioMap;
