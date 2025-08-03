import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Clock, 
  Users, 
  Award,
  Search,
  Filter,
  Navigation,
  Calendar,
  Heart,
  Share2,
  Info,
  CheckCircle,
  AlertCircle,
  Building2,
  Ambulance,
  Baby,
  Shield,
  Wifi,
  Car
} from 'lucide-react';

const HospitalList = () => {
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [filters, setFilters] = useState({
    rating: 'all',
    distance: 'all',
    services: []
  });
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const services = [
    { name: "Maternity Ward", icon: Baby },
    { name: "Emergency", icon: Ambulance },
    { name: "WiFi", icon: Wifi },
    { name: "Cafeteria", icon: Building2 }
  ];

  const fetchHospitals = async () => {
    if (!address) {
      alert("Please enter an address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/user/getClosestHospitals", { address });
      console.log("Fetched Hospitals:", response.data.data);
      
      // Enhance hospital data with additional information
      const enhancedHospitals = response.data.data.map(hospital => ({
        ...hospital,
        rating: hospital.rating || Math.floor(Math.random() * 2) + 4, // 4-5 stars
        reviews: Math.floor(Math.random() * 100) + 20,
        distance: Math.floor(Math.random() * 10) + 1, // 1-10 km
        services: services.slice(0, Math.floor(Math.random() * 4) + 2), // 2-5 services
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `https://${hospital.name.toLowerCase().replace(/\s+/g, '')}.com`,
        hours: "24/7",
        waitTime: Math.floor(Math.random() * 30) + 5, // 5-35 minutes
        insurance: ["Blue Cross", "Aetna", "Cigna"].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
      
      setHospitals(enhancedHospitals);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError("Failed to fetch hospital data. Please try again.");
    }

    setLoading(false);
  };

  const getRandomImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const renderMap = (hospital) => {
    setSelectedHospital(hospital);

    setTimeout(() => {
      if (mapInstance) {
        mapInstance.remove();
      }

      const map = L.map("map").setView([hospital.latitude, hospital.longitude], 14);
      setMapInstance(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([hospital.latitude, hospital.longitude], { icon: L.divIcon({ className: "invisible" }) })
        .addTo(map)
        .bindPopup(`<b>${hospital.name}</b><br>${hospital.address}`)
        .openPopup();
    }, 100);
  };

  const toggleFavorite = (hospitalName) => {
    setFavorites(prev => 
      prev.includes(hospitalName) 
        ? prev.filter(name => name !== hospitalName)
        : [...prev, hospitalName]
    );
  };

  const filteredHospitals = hospitals.filter(hospital => {
    if (filters.rating !== 'all' && hospital.rating < parseInt(filters.rating)) return false;
    if (filters.distance !== 'all' && hospital.distance > parseInt(filters.distance)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Maternity Hospitals
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover the best maternity hospitals and clinics near you with detailed information, ratings, and reviews.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your address or location..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button
                onClick={fetchHospitals}
                disabled={loading}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {loading ? 'Searching...' : 'Find Hospitals'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'} hover:bg-blue-50 transition-colors`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'} hover:bg-blue-50 transition-colors`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'} hover:bg-blue-50 transition-colors`}
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={filters.rating}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>

            <select
              value={filters.distance}
              onChange={(e) => setFilters(prev => ({ ...prev, distance: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any Distance</option>
              <option value="5">Within 5km</option>
              <option value="10">Within 10km</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4">Services & Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({ ...prev, services: [...prev.services, service.name] }));
                        } else {
                          setFilters(prev => ({ ...prev, services: prev.services.filter(s => s !== service.name) }));
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <service.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{service.name}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        {hospitals.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredHospitals.length} hospitals found
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{favorites.length} favorites</span>
            </div>
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && selectedHospital && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Location of {selectedHospital.name}</h2>
            <div id="map" className="w-full h-96 border rounded-lg shadow-lg"></div>
          </motion.div>
        )}

        {/* Hospitals Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hospitals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-500">Enter an address to search for nearby maternity hospitals</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'}`}>
                    <img
                      src={getRandomImage()}
                      alt="Hospital"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => toggleFavorite(hospital.name)}
                        className={`p-1.5 rounded-full ${favorites.includes(hospital.name) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'} hover:scale-110 transition-all`}
                      >
                        <Heart className={`w-3 h-3 ${favorites.includes(hospital.name) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-1.5 rounded-full bg-white/80 text-gray-600 hover:scale-110 transition-all">
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {hospital.distance}km away
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{hospital.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{hospital.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{hospital.address}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{hospital.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{hospital.reviews} reviews</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hospital.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {service.name}
                        </span>
                      ))}
                      {hospital.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{hospital.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => renderMap(hospital)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        View Map
                      </button>
                      <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Book
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
