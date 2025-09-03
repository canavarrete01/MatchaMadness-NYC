import React, { useRef, useEffect } from 'react';
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

function MatchaMapExpanded({ cafes = [], selectedCafe, setSelectedCafe, selectedBorough = 'All' }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

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

  if (!isLoaded) return <div>Loading map...</div>;

  const initialCenter = selectedCafe
    ? selectedCafe.location
    : (boroughCenters[selectedBorough]?.center || boroughCenters['All'].center);
  const initialZoom = selectedCafe
    ? 16
    : (boroughCenters[selectedBorough]?.zoom || boroughCenters['All'].zoom);

  return (
    <div className="hero-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={initialZoom}
        onLoad={map => (mapRef.current = map)}
      >
        {cafes.map(cafe => (
          <Marker
            key={cafe.id}
            position={cafe.location}
            icon={{
              url: "/matcha-pin.svg",
              scaledSize: { width: 32, height: 40 }
            }}
            onClick={() => setSelectedCafe(cafe)}
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
}

export default MatchaMapExpanded;