import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import '../App.css';

const boroughCenters = {
  'All': { center: { lat: 40.727691, lng: -73.995083 }, zoom: 12 },
  'Manhattan': { center: { lat: 40.727691, lng: -73.995083 }, zoom: 12 },
  'Brooklyn': { center: { lat: 40.6982, lng: -73.9442 }, zoom: 12 },
  'Queens': { center: { lat: 40.7482, lng: -73.8570 }, zoom: 11.75 },
  'Bronx': { center: { lat: 40.8448, lng: -73.8648 }, zoom: 12 },
  'Staten Island': { center: { lat: 40.5795, lng: -74.1502 }, zoom: 11 }
};

const containerStyle = {
  width: '100%',
  height: '100%',
  border: '2px solid #a8bc87',
  borderRadius: '18px'
};

// Custom map styles (define here)
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5dc" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#77A8C8" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#B0D5AB" }]
  }
];

const MatchaMap = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [matchaCafes, setMatchaCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [mapCenter, setMapCenter] = useState(boroughCenters['All'].center);
  const [mapZoom, setMapZoom] = useState(boroughCenters['All'].zoom);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  // Center map on selected cafe or borough
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      if (selectedCafe) {
        mapRef.current.panTo(selectedCafe.location);
        mapRef.current.setZoom(16);
      } else {
        const { center, zoom } = boroughCenters[selectedBorough] || boroughCenters['All'];
        mapRef.current.panTo(center);
        mapRef.current.setZoom(zoom);
      }
    }
  }, [selectedCafe, selectedBorough, isLoaded]);

  // Fetch cafes from backend
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${API_BASE_URL}/api/places`);
        if (!response.ok) throw new Error('Failed to fetch cafes');
        const data = await response.json();
        const formattedCafes = data.map(cafe => ({
          id: cafe._id,
          place_id: cafe.place_id,
          name: cafe.name,
          address: cafe.formatted_address,
          location: {
            lat: cafe.location.lat,
            lng: cafe.location.lng
          },
          borough: cafe.borough,
          rating: cafe.rating,
          user_ratings_total: cafe.user_ratings_total,
          reviews: cafe.reviews || [],
          website: cafe.website,
          formatted_phone_number: cafe.formatted_phone_number,
          price_level: cafe.price_level,
          opening_hours: cafe.opening_hours,
          last_updated: cafe.last_updated
        }));
        setMatchaCafes(formattedCafes);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching cafes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCafes();
  }, []);

  // Filter cafes by borough
  useEffect(() => {
    const { center, zoom } = boroughCenters[selectedBorough];
    setMapCenter(center);
    setMapZoom(zoom);

    if (selectedBorough === 'All') {
      setFilteredCafes(matchaCafes);
    } else {
      setFilteredCafes(matchaCafes.filter(cafe => cafe.borough === selectedBorough));
    }
  }, [selectedBorough, matchaCafes]);

  // Fetch details and reviews when a marker is clicked
  const handleMarkerClick = async (cafe) => {
    if (!cafe.reviews || cafe.reviews.length === 0) {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${API_BASE_URL}/api/places/details/${cafe.place_id}`);
        if (!response.ok) throw new Error('Failed to fetch cafe details');
        const detailsData = await response.json();
        const updatedCafe = {
          ...cafe,
          reviews: detailsData.reviews || [],
          website: detailsData.website,
          phone: detailsData.formatted_phone_number
        };
        setMatchaCafes(prevCafes =>
          prevCafes.map(c => c.id === cafe.id ? updatedCafe : c)
        );
        setSelectedCafe(updatedCafe);
      } catch (err) {
        console.error('Error fetching cafe details:', err);
        setSelectedCafe(cafe);
      }
    } else {
      setSelectedCafe(cafe);
    }
  };

  if (loading) return <div>Loading cafes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="hero-map" >
      <div className="borough-filter">
        <label htmlFor="borough-select" className="borough-label">Filter by Borough: </label>
        <select
          className="borough-select"
          id="borough-select"
          value={selectedBorough}
          onChange={(e) => setSelectedBorough(e.target.value)}
        >
          <option value="All">All Boroughs</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
          <option value="Bronx">Bronx</option>
          <option value="Staten Island">Staten Island</option>
        </select>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={{ styles: mapStyles }}
        onLoad={map => (mapRef.current = map)}
      >
        {filteredCafes.map(cafe => (
          <Marker
            key={cafe.id}
            position={cafe.location}
            icon={{
              url: "/matcha-pin.svg",
              scaledSize: { width: 32, height: 40 }
            }}
            onClick={() => handleMarkerClick(cafe)}
          />
        ))}
        {selectedCafe && (
          <InfoWindow
            position={selectedCafe.location}
            onCloseClick={() => setSelectedCafe(null)}
          >
            <div className="info-window">
              <h3>{selectedCafe.name}</h3>
              <div className="rating">★ {selectedCafe.rating}</div>
              <p>{selectedCafe.address}</p>
              <p>Borough: {selectedCafe.borough}</p>
              {selectedCafe.website && (
                <p><a href={selectedCafe.website} target="_blank" rel="noopener noreferrer">Website</a></p>
              )}
              {selectedCafe.formatted_phone_number && (
                <p>Phone: {selectedCafe.formatted_phone_number}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MatchaMap;

