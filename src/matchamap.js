require('dotenv').config();
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const MatchaMap = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [matchaCafes, setMatchaCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [filteredCafes, setFilteredCafes] = useState([]);
  
  // Manhattan coordinates
  const mapCenter = {
    lat: 40.727691,
    lng: -73.995083
  };
  
  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "20px"
  };
  
  // Fetch cafes from backend
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5050/api/places');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cafes');
        }
        
        const data = await response.json();
        
        // Transform data to match our component's format
        const formattedCafes = data.map(cafe => ({
          id: cafe._id,
          place_id: cafe.place_id,
          name: cafe.name,
          position: {
            lat: cafe.location.lat,
            lng: cafe.location.lng
          },
          rating: cafe.rating,
          address: cafe.formatted_address,
          borough: cafe.borough,
          reviews: cafe.reviews || [],
          website: cafe.website,
          phone: cafe.formatted_phone_number
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
        const response = await fetch(`http://localhost:5050/api/places/details/${cafe.place_id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cafe details');
        }
        
        const detailsData = await response.json();
        
        // Update the selected cafe with details
        const updatedCafe = {
          ...cafe,
          reviews: detailsData.reviews || [],
          website: detailsData.website,
          phone: detailsData.formatted_phone_number
        };
        
        // Update the cafe in our state
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
  
  return (
    <div className="matcha-map-container">
      {/* Borough filter */}
      <div className="borough-filter">
        <label htmlFor="borough-select">Filter by Borough: </label>
        <select 
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
      
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
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
          {filteredCafes.map(cafe => (
            <Marker
              key={cafe.id}
              position={cafe.position}
              icon={{
                url: "/matcha-pin.svg", // Custom pin icon
                scaledSize: { width: 32, height: 40 }
              }}
              onClick={() => handleMarkerClick(cafe)}
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
                <p>Borough: {selectedCafe.borough}</p>
                {selectedCafe.phone && <p>{selectedCafe.phone}</p>}
                {selectedCafe.website && (
                  <p><a href={selectedCafe.website} target="_blank" rel="noopener noreferrer">Website</a></p>
                )}
                <div className="reviews-preview">
                  {selectedCafe.reviews && selectedCafe.reviews.length > 0 ? (
                    <>
                      <p>"{selectedCafe.reviews[0].text.substring(0, 100)}..."</p>
                      <a href={`#cafe-${selectedCafe.id}`}>Read all {selectedCafe.reviews.length} reviews</a>
                    </>
                  ) : (
                    <p>Loading reviews...</p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MatchaMap;


// Previous Draft, Test Code
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const MatchaMap = () => {
//   const [selectedCafe, setSelectedCafe] = useState(null);
//   const [matchaCafes, setMatchaCafes] = useState([]);
  
//   // Manhattan coordinates
//   const mapCenter = {
//     lat: 40.727691,
//     lng: -73.995083
//   };
  
//   const mapStyles = {
//     height: "100%",
//     width: "100%",
//     borderRadius: "20px"
//   };
  
//   // Sample data for matcha cafes in Manhattan
//   // In a real implementation, this would come from your database or API
//   useEffect(() => {
//     // Simulating data fetch
//     const cafes = [
//       {
//         id: 1,
//         name: "Cha Cha Matcha",
//         position: { lat: 40.7216, lng: -73.9989 },
//         rating: 4.5,
//         address: "373 Broome St, New York, NY 10013"
//       },
//       {
//         id: 2,
//         name: "Matcha Cafe Wabi",
//         position: { lat: 40.7281, lng: -73.9849 },
//         rating: 4.7,
//         address: "233 E 4th St, New York, NY 10009"
//       },
//       {
//         id: 3,
//         name: "Chalait",
//         position: { lat: 40.7354, lng: -74.0082 },
//         rating: 4.4,
//         address: "1216 Broadway, New York, NY 10001"
//       },
//       {
//         id: 4,
//         name: "MATCHAFUL",
//         position: { lat: 40.7224, lng: -73.9981 },
//         rating: 4.6,
//         address: "158 Mott St, New York, NY 10013"
//       },
//       {
//         id: 5,
//         name: "Matcha Bar",
//         position: { lat: 40.7188, lng: -73.9571 },
//         rating: 4.3,
//         address: "93 N 6th St, Brooklyn, NY 11249"
//       }
//     ];
    
//     setMatchaCafes(cafes);
//   }, []);
  
//   return (
//     <LoadScript
//       googleMapsApiKey="value" // Replace 
//     >
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={13}
//         center={mapCenter}
//         options={{
//           styles: [
//             {
//               featureType: "all",
//               elementType: "geometry",
//               stylers: [{ color: "#f5f5dc" }]
//             },
//             {
//               featureType: "water",
//               elementType: "geometry",
//               stylers: [{ color: "#b9d7e3" }]
//             },
//             {
//               featureType: "poi.park",
//               elementType: "geometry",
//               stylers: [{ color: "#a0b173" }]
//             }
//           ]
//         }}
//       >
//         {matchaCafes.map(cafe => (
//           <Marker
//             key={cafe.id}
//             position={cafe.position}
//             icon={{
//               url: "/matcha-pin.svg", // Custom pin icon (create this SVG file)
//               scaledSize: { width: 32, height: 40 }
//             }}
//             onClick={() => setSelectedCafe(cafe)}
//           />
//         ))}
        
//         {selectedCafe && (
//           <InfoWindow
//             position={selectedCafe.position}
//             onCloseClick={() => setSelectedCafe(null)}
//           >
//             <div className="info-window">
//               <h3>{selectedCafe.name}</h3>
//               <div className="rating">★ {selectedCafe.rating}</div>
//               <p>{selectedCafe.address}</p>
//               <a href={`#cafe-${selectedCafe.id}`}>View Details</a>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MatchaMap;