// Biodiversity data for Japan

// Species diversity by prefecture (for scatter plots)
export const speciesByAltitude = [
  { altitude: 0, species: 245, name: "Coastal" },
  { altitude: 200, species: 312, name: "Lowland" },
  { altitude: 400, species: 389, name: "Hills" },
  { altitude: 600, species: 421, name: "Mountains" },
  { altitude: 800, species: 394, name: "Highlands" },
  { altitude: 1000, species: 356, name: "Alpine" },
  { altitude: 1200, species: 298, name: "Subalpine" },
  { altitude: 1400, species: 234, name: "High Alpine" },
  { altitude: 1600, species: 178, name: "Summit" },
  { altitude: 1800, species: 112, name: "Peak" },
];

export const marineLifeDepth = [
  { depth: 0, biodiversity: 450, temperature: 22 },
  { depth: 50, biodiversity: 520, temperature: 20 },
  { depth: 100, biodiversity: 480, temperature: 18 },
  { depth: 150, biodiversity: 430, temperature: 16 },
  { depth: 200, biodiversity: 390, temperature: 14 },
  { depth: 300, biodiversity: 340, temperature: 12 },
  { depth: 400, biodiversity: 280, temperature: 10 },
  { depth: 500, biodiversity: 220, temperature: 8 },
  { depth: 600, biodiversity: 180, temperature: 7 },
  { depth: 700, biodiversity: 145, temperature: 6 },
];

export const forestBiodiversity = [
  { canopyHeight: 5, species: 89, type: "Shrubland" },
  { canopyHeight: 10, species: 156, type: "Young Forest" },
  { canopyHeight: 15, species: 234, type: "Growing Forest" },
  { canopyHeight: 20, species: 298, type: "Mature Forest" },
  { canopyHeight: 25, species: 345, type: "Old Growth" },
  { canopyHeight: 30, species: 378, type: "Ancient Forest" },
  { canopyHeight: 35, species: 389, type: "Primary Forest" },
  { canopyHeight: 40, species: 367, type: "Tall Forest" },
];

// Endemic species by region (for bar charts)
export const endemicSpeciesByRegion = [
  { region: "Hokkaido", mammals: 12, birds: 8, reptiles: 3, amphibians: 5 },
  { region: "Tohoku", mammals: 15, birds: 12, reptiles: 6, amphibians: 8 },
  { region: "Kanto", mammals: 18, birds: 15, reptiles: 9, amphibians: 11 },
  { region: "Chubu", mammals: 22, birds: 19, reptiles: 12, amphibians: 14 },
  { region: "Kansai", mammals: 20, birds: 17, reptiles: 11, amphibians: 13 },
  { region: "Chugoku", mammals: 16, birds: 14, reptiles: 8, amphibians: 10 },
  { region: "Shikoku", mammals: 19, birds: 16, reptiles: 10, amphibians: 12 },
  { region: "Kyushu", mammals: 24, birds: 21, reptiles: 14, amphibians: 16 },
  { region: "Okinawa", mammals: 28, birds: 35, reptiles: 22, amphibians: 18 },
];

export const monthlyBirdMigration = [
  { month: "Jan", arrivals: 45, departures: 78 },
  { month: "Feb", arrivals: 89, departures: 92 },
  { month: "Mar", arrivals: 234, departures: 67 },
  { month: "Apr", arrivals: 389, departures: 45 },
  { month: "May", arrivals: 267, departures: 34 },
  { month: "Jun", arrivals: 123, departures: 56 },
  { month: "Jul", arrivals: 78, departures: 89 },
  { month: "Aug", arrivals: 56, departures: 123 },
  { month: "Sep", arrivals: 67, departures: 234 },
  { month: "Oct", arrivals: 145, departures: 298 },
  { month: "Nov", arrivals: 98, departures: 189 },
  { month: "Dec", arrivals: 67, departures: 134 },
];

export const protectedAreasSize = [
  { type: "National Parks", area: 2095, count: 34 },
  { type: "Wildlife Sanctuaries", area: 1234, count: 89 },
  { type: "Marine Protected", area: 3456, count: 56 },
  { type: "Forest Reserves", area: 4567, count: 123 },
  { type: "Wetland Reserves", area: 789, count: 45 },
  { type: "Mountain Reserves", area: 2890, count: 67 },
];

// Pie chart data
export const ecosystemDistribution = [
  { name: "Temperate Forests", value: 35, color: "#2E7D32" },
  { name: "Subtropical Forests", value: 15, color: "#66BB6A" },
  { name: "Alpine Meadows", value: 8, color: "#AED581" },
  { name: "Coastal Wetlands", value: 12, color: "#29B6F6" },
  { name: "Marine Ecosystems", value: 20, color: "#0277BD" },
  { name: "Urban Green Spaces", value: 10, color: "#9E9E9E" },
];

export const threatenedSpecies = [
  { name: "Mammals", value: 37, color: "#D32F2F" },
  { name: "Birds", value: 52, color: "#F57C00" },
  { name: "Reptiles", value: 28, color: "#FBC02D" },
  { name: "Amphibians", value: 19, color: "#388E3C" },
  { name: "Fish", value: 64, color: "#1976D2" },
  { name: "Plants", value: 143, color: "#7B1FA2" },
];

// Heatmap data (temperature/precipitation patterns affecting biodiversity)
export const seasonalBiodiversity = [
  { month: "Jan", region: "Hokkaido", activity: 2 },
  { month: "Jan", region: "Honshu", activity: 3 },
  { month: "Jan", region: "Kyushu", activity: 4 },
  { month: "Jan", region: "Okinawa", activity: 6 },

  { month: "Feb", region: "Hokkaido", activity: 2 },
  { month: "Feb", region: "Honshu", activity: 3 },
  { month: "Feb", region: "Kyushu", activity: 5 },
  { month: "Feb", region: "Okinawa", activity: 6 },

  { month: "Mar", region: "Hokkaido", activity: 4 },
  { month: "Mar", region: "Honshu", activity: 6 },
  { month: "Mar", region: "Kyushu", activity: 7 },
  { month: "Mar", region: "Okinawa", activity: 8 },

  { month: "Apr", region: "Hokkaido", activity: 6 },
  { month: "Apr", region: "Honshu", activity: 8 },
  { month: "Apr", region: "Kyushu", activity: 9 },
  { month: "Apr", region: "Okinawa", activity: 9 },

  { month: "May", region: "Hokkaido", activity: 8 },
  { month: "May", region: "Honshu", activity: 9 },
  { month: "May", region: "Kyushu", activity: 9 },
  { month: "May", region: "Okinawa", activity: 9 },

  { month: "Jun", region: "Hokkaido", activity: 9 },
  { month: "Jun", region: "Honshu", activity: 9 },
  { month: "Jun", region: "Kyushu", activity: 8 },
  { month: "Jun", region: "Okinawa", activity: 8 },

  { month: "Jul", region: "Hokkaido", activity: 9 },
  { month: "Jul", region: "Honshu", activity: 9 },
  { month: "Jul", region: "Kyushu", activity: 8 },
  { month: "Jul", region: "Okinawa", activity: 7 },

  { month: "Aug", region: "Hokkaido", activity: 9 },
  { month: "Aug", region: "Honshu", activity: 8 },
  { month: "Aug", region: "Kyushu", activity: 7 },
  { month: "Aug", region: "Okinawa", activity: 7 },

  { month: "Sep", region: "Hokkaido", activity: 7 },
  { month: "Sep", region: "Honshu", activity: 8 },
  { month: "Sep", region: "Kyushu", activity: 8 },
  { month: "Sep", region: "Okinawa", activity: 8 },

  { month: "Oct", region: "Hokkaido", activity: 5 },
  { month: "Oct", region: "Honshu", activity: 7 },
  { month: "Oct", region: "Kyushu", activity: 8 },
  { month: "Oct", region: "Okinawa", activity: 8 },

  { month: "Nov", region: "Hokkaido", activity: 3 },
  { month: "Nov", region: "Honshu", activity: 5 },
  { month: "Nov", region: "Kyushu", activity: 6 },
  { month: "Nov", region: "Okinawa", activity: 7 },

  { month: "Dec", region: "Hokkaido", activity: 2 },
  { month: "Dec", region: "Honshu", activity: 4 },
  { month: "Dec", region: "Kyushu", activity: 5 },
  { month: "Dec", region: "Okinawa", activity: 6 },
];

export const habitatHealthMatrix = [
  { habitat: "Forests", indicator: "Canopy Coverage", value: 8 },
  { habitat: "Forests", indicator: "Soil Quality", value: 7 },
  { habitat: "Forests", indicator: "Water Availability", value: 6 },
  { habitat: "Forests", indicator: "Species Richness", value: 9 },

  { habitat: "Wetlands", indicator: "Canopy Coverage", value: 3 },
  { habitat: "Wetlands", indicator: "Soil Quality", value: 9 },
  { habitat: "Wetlands", indicator: "Water Availability", value: 10 },
  { habitat: "Wetlands", indicator: "Species Richness", value: 8 },

  { habitat: "Coastal", indicator: "Canopy Coverage", value: 2 },
  { habitat: "Coastal", indicator: "Soil Quality", value: 5 },
  { habitat: "Coastal", indicator: "Water Availability", value: 10 },
  { habitat: "Coastal", indicator: "Species Richness", value: 7 },

  { habitat: "Mountains", indicator: "Canopy Coverage", value: 6 },
  { habitat: "Mountains", indicator: "Soil Quality", value: 6 },
  { habitat: "Mountains", indicator: "Water Availability", value: 7 },
  { habitat: "Mountains", indicator: "Species Richness", value: 7 },

  { habitat: "Urban", indicator: "Canopy Coverage", value: 4 },
  { habitat: "Urban", indicator: "Soil Quality", value: 3 },
  { habitat: "Urban", indicator: "Water Availability", value: 4 },
  { habitat: "Urban", indicator: "Species Richness", value: 3 },
];

// Map data for biodiversity hotspots in Japan
export const biodiversityHotspots = [
  {
    name: "Shiretoko National Park",
    lat: 44.0885,
    lng: 145.1094,
    species: 456,
    description: "UNESCO World Heritage site with rich marine and terrestrial biodiversity"
  },
  {
    name: "Yakushima Island",
    lat: 30.3347,
    lng: 130.5131,
    species: 1900,
    description: "Ancient cedar forests and unique endemic species"
  },
  {
    name: "Ogasawara Islands",
    lat: 27.0930,
    lng: 142.1916,
    species: 441,
    description: "Isolated island ecosystem with high endemism"
  },
  {
    name: "Okinawa Yanbaru",
    lat: 26.7464,
    lng: 128.1553,
    species: 567,
    description: "Subtropical forests with rare bird species"
  },
  {
    name: "Mount Fuji",
    lat: 35.3606,
    lng: 138.7278,
    species: 289,
    description: "Iconic mountain with diverse alpine ecosystems"
  },
  {
    name: "Kushiro Wetlands",
    lat: 43.0955,
    lng: 144.3915,
    species: 678,
    description: "Japan's largest wetland and red-crowned crane habitat"
  },
  {
    name: "Iriomote Island",
    lat: 24.3422,
    lng: 123.7618,
    species: 523,
    description: "Mangrove forests and endemic Iriomote cat"
  },
  {
    name: "Japanese Alps",
    lat: 36.2857,
    lng: 137.6475,
    species: 412,
    description: "Mountain ranges with diverse alpine flora and fauna"
  },
];
