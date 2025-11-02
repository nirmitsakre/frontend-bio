import React, { useState, useMemo } from 'react';
import './SearchFilter.css';

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const allSpeciesData = [
    { name: 'Japanese Macaque', category: 'mammals', status: 'Least Concern', region: 'Nationwide', population: '114,000', description: 'Snow monkeys famous for hot spring bathing' },
    { name: 'Red-crowned Crane', category: 'birds', status: 'Endangered', region: 'Hokkaido', population: '1,800', description: 'Iconic symbol of luck and longevity' },
    { name: 'Iriomote Cat', category: 'mammals', status: 'Critically Endangered', region: 'Okinawa', population: '100', description: 'Endemic wild cat of Iriomote Island' },
    { name: 'Japanese Giant Salamander', category: 'amphibians', status: 'Near Threatened', region: 'Chubu, Chugoku', population: '3,000', description: 'World\'s largest amphibian, up to 1.5m' },
    { name: 'Steller\'s Sea Eagle', category: 'birds', status: 'Vulnerable', region: 'Hokkaido', population: '5,000', description: 'One of the largest eagles in the world' },
    { name: 'Japanese Serow', category: 'mammals', status: 'Least Concern', region: 'Honshu, Shikoku, Kyushu', population: '100,000', description: 'Goat-antelope endemic to Japan' },
    { name: 'Blakiston\'s Fish Owl', category: 'birds', status: 'Endangered', region: 'Hokkaido', population: '165', description: 'World\'s largest owl species' },
    { name: 'Amami Rabbit', category: 'mammals', status: 'Endangered', region: 'Amami Islands', population: '5,000', description: 'Living fossil, primitive rabbit' },
    { name: 'Ryukyu Robin', category: 'birds', status: 'Endangered', region: 'Okinawa', population: '1,000', description: 'Endemic songbird of the Ryukyu Islands' },
    { name: 'Okinawa Rail', category: 'birds', status: 'Endangered', region: 'Okinawa', population: '1,500', description: 'Flightless bird endemic to Yanbaru' },
    { name: 'Japanese River Otter', category: 'mammals', status: 'Extinct', region: 'Historical', population: '0', description: 'Last seen in 1979, declared extinct 2012' },
    { name: 'Pryer\'s Woodpecker', category: 'birds', status: 'Vulnerable', region: 'Okinawa', population: '1,000', description: 'Endemic woodpecker of Okinawa' },
    { name: 'Ezo Brown Bear', category: 'mammals', status: 'Least Concern', region: 'Hokkaido', population: '10,000', description: 'Largest land animal in Japan' },
    { name: 'Japanese Wood Pigeon', category: 'birds', status: 'Near Threatened', region: 'Southern Islands', population: '2,500', description: 'Large endemic pigeon species' },
    { name: 'Ishikawa\'s Frog', category: 'amphibians', status: 'Endangered', region: 'Okinawa', population: 'Unknown', description: 'Endemic frog with green and purple coloration' },
    { name: 'Anderson\'s Crocodile Newt', category: 'amphibians', status: 'Endangered', region: 'Okinawa', population: '1,000', description: 'Unique tuberculate skin pattern' },
    { name: 'Kikuzato\'s Brook Salamander', category: 'amphibians', status: 'Critically Endangered', region: 'Kyushu', population: '500', description: 'Extremely rare mountain salamander' },
    { name: 'Japanese Giant Flying Squirrel', category: 'mammals', status: 'Least Concern', region: 'Honshu, Shikoku, Kyushu', population: 'Unknown', description: 'Nocturnal gliding mammal' },
    { name: 'Lidth\'s Jay', category: 'birds', status: 'Vulnerable', region: 'Amami Islands', population: '6,000', description: 'Endemic corvid with striking plumage' },
    { name: 'Loggerhead Sea Turtle', category: 'reptiles', status: 'Vulnerable', region: 'Coastal waters', population: '40,000', description: 'Important nesting beaches in Japan' },
    { name: 'Japanese Pond Turtle', category: 'reptiles', status: 'Endangered', region: 'Nationwide', population: 'Declining', description: 'Native freshwater turtle' },
    { name: 'Miyako Grass Lizard', category: 'reptiles', status: 'Endangered', region: 'Miyako Islands', population: 'Unknown', description: 'Endemic small lizard' },
    { name: 'Yaeyama Palm Civet', category: 'mammals', status: 'Vulnerable', region: 'Yaeyama Islands', population: '200', description: 'Rare endemic subspecies' },
    { name: 'Japanese Crested Ibis', category: 'birds', status: 'Endangered', region: 'Sado Island', population: '400', description: 'Symbol of conservation success' }
  ];

  const categories = [
    { id: 'all', name: 'All Species', icon: '🌿', count: allSpeciesData.length },
    { id: 'mammals', name: 'Mammals', icon: '🦊', count: allSpeciesData.filter(s => s.category === 'mammals').length },
    { id: 'birds', name: 'Birds', icon: '🦅', count: allSpeciesData.filter(s => s.category === 'birds').length },
    { id: 'reptiles', name: 'Reptiles', icon: '🦎', count: allSpeciesData.filter(s => s.category === 'reptiles').length },
    { id: 'amphibians', name: 'Amphibians', icon: '🐸', count: allSpeciesData.filter(s => s.category === 'amphibians').length }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: '#94a3b8' },
    { id: 'Least Concern', name: 'Least Concern', color: '#10b981' },
    { id: 'Near Threatened', name: 'Near Threatened', color: '#84cc16' },
    { id: 'Vulnerable', name: 'Vulnerable', color: '#f59e0b' },
    { id: 'Endangered', name: 'Endangered', color: '#ef4444' },
    { id: 'Critically Endangered', name: 'Critically Endangered', color: '#dc2626' },
    { id: 'Extinct', name: 'Extinct', color: '#64748b' }
  ];

  const filteredSpecies = useMemo(() => {
    return allSpeciesData.filter(species => {
      const matchesSearch = species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           species.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           species.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || species.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || species.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, filterCategory, filterStatus, allSpeciesData]);

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj?.color || '#94a3b8';
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterStatus('all');
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-header">
        <h2>🔍 Species Explorer</h2>
        <p>Search and filter through Japan's diverse wildlife</p>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search species by name, description, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${filterCategory === cat.id ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Conservation Status</label>
          <select
            className="status-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            ↻ Clear All Filters
          </button>
        )}
      </div>

      <div className="results-header">
        <span className="results-count">
          Found <strong>{filteredSpecies.length}</strong> species
        </span>
      </div>

      <div className="species-grid">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map((species, index) => (
            <div key={index} className="species-card">
              <div className="species-header">
                <h3>{species.name}</h3>
                <span
                  className="species-status"
                  style={{ backgroundColor: getStatusColor(species.status) }}
                >
                  {species.status}
                </span>
              </div>
              <div className="species-info">
                <div className="info-row">
                  <span className="info-label">🏷️ Category:</span>
                  <span className="info-value">{species.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📍 Region:</span>
                  <span className="info-value">{species.region}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">👥 Population:</span>
                  <span className="info-value">{species.population}</span>
                </div>
              </div>
              <p className="species-description">{species.description}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No species found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
