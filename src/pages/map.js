// pages/map.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import MatchaMap from '../matchamap'; // google map component
import CafeReviews from '../CafeReviews';

function Map() {
   const [cafes, setCafes] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const normalize = str =>
          str
            .trim()
            .toLowerCase()
            .normalize("NFKD") // handles accented characters
            .replace(/[’‘']/g, "'") // replace curly quotes with straight
            .replace(/\s+/g, ' ');  // collapse multiple spaces
        
        const featuredCafeNames = ["Matcha Cafe Maiko", "KIJITORA", "Nana's Green Tea"].map(normalize);
        
        const featuredCafes = cafes.filter(cafe =>
          featuredCafeNames.includes(normalize(cafe.name))
        );
      
        const cafeImages = {
          "Matcha Cafe Maiko": "cafe_photos/matchamaiko.png",
          "Nana's Green Tea": "cafe_photos/nanas.png",
          "KIJITORA": "cafe_photos/kijitora.png"
        };
        
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
              
              setCafes(formattedCafes);
            } catch (err) {
              setError(err.message);
              console.error('Error fetching cafes:', err);
            } finally {
              setLoading(false);
            }
          };
          
          fetchCafes();
        }, []);
        
        if (loading) return <div className="loading">Loading matcha cafes...</div>;
        if (error) return <div className="error">Error: {error}</div>;
      

  return (
    <div style={{ padding: '20px' }}>
      <h1>Map Page</h1>
      <p>Map will go here</p>

      {/* Left Column: Directory */}
      <div className="directory">
        <h2 className="directory-title">Matcha Cafes</h2>
        <div className="cafe-list">
          {featuredCafes.map(cafe => (
            <div key={cafe.id} className="cafe-card">
              <div className="cafe-info">
                <h3 className="cafe-name">{cafe.name}</h3>
                <p className="cafe-address">{cafe.address}</p>
                
                <p className="cafe-rating">Rating: {cafe.rating} ({cafe.user_ratings_total} reviews)</p>

                {/* {cafe.price_level && <p className="cafe-price">Price Level: {'$'.repeat(cafe.price.price_level)}</p>}
                {cafe.opening_hours && cafe.opening_hours.open_now !== undefined && (
                  <p className="cafe-hours">
                    Currently: {cafe.opening_hours.open_now ? 'Open' : 'Closed'}
                  </p>
                )} */}
                {cafe.website && (
                  <p className="cafe-website">
                    <a href={cafe.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Right Column: Map */}
       <div className="hero-map" id="map">
        <MatchaMap cafes={cafes} />
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <CafeReviews cafes={cafes} />
      </div>


    </div>
  );
}

export default Map;