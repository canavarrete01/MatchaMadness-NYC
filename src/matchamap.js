import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MatchaMap = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [matchaCafes, setMatchaCafes] = useState([]);
  
  // Manhattan coordinates
  const mapCenter = {
    lat: 40.7831,
    lng: -73.9712
  };
  
  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "20px"
  };
  
  // Sample data for matcha cafes in Manhattan
  // In a real implementation, this would come from your database or API
  useEffect(() => {
    // Simulating data fetch
    const cafes = [
      {
        id: 1,
        name: "Cha Cha Matcha",
        position: { lat: 40.7216, lng: -73.9989 },
        rating: 4.5,
        address: "373 Broome St, New York, NY 10013"
      },
      {
        id: 2,
        name: "Matcha Cafe Wabi",
        position: { lat: 40.7281, lng: -73.9849 },
        rating: 4.7,
        address: "233 E 4th St, New York, NY 10009"
      },
      {
        id: 3,
        name: "Chalait",
        position: { lat: 40.7354, lng: -74.0082 },
        rating: 4.4,
        address: "1216 Broadway, New York, NY 10001"
      },
      {
        id: 4,
        name: "MATCHAFUL",
        position: { lat: 40.7224, lng: -73.9981 },
        rating: 4.6,
        address: "158 Mott St, New York, NY 10013"
      },
      {
        id: 5,
        name: "Matcha Bar",
        position: { lat: 40.7188, lng: -73.9571 },
        rating: 4.3,
        address: "93 N 6th St, Brooklyn, NY 11249"
      }
    ];
    
    setMatchaCafes(cafes);
  }, []);
  
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA3yFSFqF-7DHZ---aP4ttYMvPuWkHocuE" // Replace with your actual API key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={mapCenter}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5dc" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#b9d7e3" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#a0b173" }]
            }
          ]
        }}
      >
        {matchaCafes.map(cafe => (
          <Marker
            key={cafe.id}
            position={cafe.position}
            icon={{
              url: "/matcha-pin.svg", // Custom pin icon (create this SVG file)
              scaledSize: { width: 32, height: 40 }
            }}
            onClick={() => setSelectedCafe(cafe)}
          />
        ))}
        
        {selectedCafe && (
          <InfoWindow
            position={selectedCafe.position}
            onCloseClick={() => setSelectedCafe(null)}
          >
            <div className="info-window">
              <h3>{selectedCafe.name}</h3>
              <div className="rating">★ {selectedCafe.rating}</div>
              <p>{selectedCafe.address}</p>
              <a href={`#cafe-${selectedCafe.id}`}>View Details</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MatchaMap;