import React, { useState } from 'react';
import './SpeciesGallery.css';

const SpeciesGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const species = [
    {
      name: 'Japanese Macaque',
      category: 'mammals',
      status: 'Least Concern',
      description: 'Also known as snow monkeys, famous for bathing in hot springs',
      icon: '🐵',
      color: '#FF6B6B'
    },
    {
      name: 'Red-crowned Crane',
      category: 'birds',
      status: 'Endangered',
      description: 'Sacred bird in Japanese culture, symbol of longevity',
      icon: '🦢',
      color: '#D32F2F'
    },
    {
      name: 'Japanese Giant Salamander',
      category: 'amphibians',
      status: 'Near Threatened',
      description: 'One of the largest salamanders in the world',
      icon: '🦎',
      color: '#8B4513'
    },
    {
      name: 'Iriomote Cat',
      category: 'mammals',
      status: 'Critically Endangered',
      description: 'Endemic wild cat found only on Iriomote Island',
      icon: '🐱',
      color: '#FF8C00'
    },
    {
      name: 'Japanese Serow',
      category: 'mammals',
      status: 'Least Concern',
      description: 'Goat-antelope found in dense mountain forests',
      icon: '🦌',
      color: '#A0522D'
    },
    {
      name: 'Steller\'s Sea Eagle',
      category: 'birds',
      status: 'Vulnerable',
      description: 'One of the largest and heaviest eagles in the world',
      icon: '🦅',
      color: '#1976D2'
    },
    {
      name: 'Japanese Fire Belly Newt',
      category: 'amphibians',
      status: 'Least Concern',
      description: 'Small newt with distinctive red belly',
      icon: '🦎',
      color: '#FF4500'
    },
    {
      name: 'Blakiston\'s Fish Owl',
      category: 'birds',
      status: 'Endangered',
      description: 'World\'s largest owl species, found in Hokkaido',
      icon: '🦉',
      color: '#795548'
    },
    {
      name: 'Japanese Giant Flying Squirrel',
      category: 'mammals',
      status: 'Least Concern',
      description: 'Nocturnal gliding mammal with large eyes',
      icon: '🐿️',
      color: '#9E9E9E'
    },
    {
      name: 'Okinawa Rail',
      category: 'birds',
      status: 'Endangered',
      description: 'Flightless bird endemic to Okinawa Island',
      icon: '🐦',
      color: '#4CAF50'
    },
    {
      name: 'Japanese River Otter',
      category: 'mammals',
      status: 'Extinct',
      description: 'Last seen in 1979, declared extinct in 2012',
      icon: '🦦',
      color: '#607D8B'
    },
    {
      name: 'Ryukyu Flying Fox',
      category: 'mammals',
      status: 'Endangered',
      description: 'Large fruit bat endemic to Ryukyu Islands',
      icon: '🦇',
      color: '#3F51B5'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Species', icon: '🌟' },
    { id: 'mammals', name: 'Mammals', icon: '🦊' },
    { id: 'birds', name: 'Birds', icon: '🦅' },
    { id: 'amphibians', name: 'Amphibians', icon: '🐸' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Least Concern': '#4CAF50',
      'Near Threatened': '#FFC107',
      'Vulnerable': '#FF9800',
      'Endangered': '#FF5722',
      'Critically Endangered': '#D32F2F',
      'Extinct': '#757575'
    };
    return colors[status] || '#9E9E9E';
  };

  const filteredSpecies = selectedCategory === 'all'
    ? species
    : species.filter(s => s.category === selectedCategory);

  return (
    <div className="gallery-container">
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="filter-icon">{cat.icon}</span>
            <span className="filter-name">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="species-grid">
        {filteredSpecies.map((species, index) => (
          <div
            key={index}
            className="species-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="species-icon" style={{ backgroundColor: species.color }}>
              {species.icon}
            </div>
            <div className="species-info">
              <h4 className="species-name">{species.name}</h4>
              <div
                className="species-status"
                style={{ backgroundColor: getStatusColor(species.status) }}
              >
                {species.status}
              </div>
              <p className="species-description">{species.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesGallery;
