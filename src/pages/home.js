import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import MatchaMap from '../components/matchamap'; // google map component
// import CafeReviews from './CafeReviews';

function Home() {
  const navigate = useNavigate();
  
  // Test API Integration
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  const normalize = str =>
    str
      .trim()
      .toLowerCase()
      .normalize("NFKD") // handles accented characters
      .replace(/[''']/g, "'") // replace curly quotes with straight
      .replace(/\s+/g, ' ');  // collapse multiple spaces
  
  const featuredCafeNames = ["Matcha Cafe Maiko", "KIJITORA", "Isshiki Matcha"].map(normalize);

  // Use normalized names for image lookup
  const cafeImages = {
    [normalize("Matcha Cafe Maiko")]: "/cafe_photos/matchamaiko.png",
    [normalize("Isshiki Matcha")]: "/cafe_photos/isshiki.png",
    [normalize("KIJITORA")]: "/cafe_photos/kijitora.png"
  };

  const featuredCafes = cafes
    .map(cafe => ({
      ...cafe,
      normalizedName: normalize(cafe.name)
    }))
    .filter(cafe =>
      featuredCafeNames.includes(cafe.normalizedName)
    );
  
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${API_BASE_URL}/api/places`);
      
        
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

  // Main App Container
  return (
    <div className="Home">
      <div className="hero-section">
        <div className="hero-text centered">
          <h1 className="hero-text">MATCHA<br />MADNESS<br />NYC</h1>
          <p className="hero-text"> Find the best matcha cafes in your borough with our curated map and rating system</p>
          <div>
            <button
              onClick={() => navigate('/map')} 
              style={{
                padding: '12px 24px',
                backgroundColor: '#799300',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              Explore More Matcha...
            </button>
          </div>
        </div>
        <div className="hero-map" id="map">
          <MatchaMap
            cafes={cafes}
            selectedCafe={selectedCafe}
            setSelectedCafe={setSelectedCafe}
          />
        </div>
      </div>
    
      {/* Content Section */}
      {/* add animation to move upon load, scroll */}

      <div style={{
        width: '100%',
        height: '60px',
        overflow: 'hidden',
        lineHeight: 0,
        // margin: '48px 0'
      }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d="M0,30 Q300,60 600,30 T1200,30 V60 H0 Z" fill="#a8bc87" />
        </svg>
      </div>

      <div className="content-section">
        {/* Banner/Section Divider */}
        <div className="scrolling-banner-wrapper">
          <div className="scrolling-banner">
            <span>
              {[...Array(25)].map((_, i) => (
                <span key={i}>TOP RATED • </span>
              ))}
            </span>
          </div>
        </div>

        <div className="cafe-showcase">

          {/* include # of google reviews and total rating */}
          {featuredCafes.map((cafe) => (
            <div key={cafe.id} className="cafe-card">
              <h2 className="cafe-name">{cafe.name.toUpperCase()}</h2>

              <div className={`cafe-image`}>
                <img className='cafe-image'
                  src={cafeImages[cafe.normalizedName] || '/cafe_photos/nanas.png'}
                  alt={cafe.name} 
                />
                {cafe.normalizedName === normalize('Matcha Cafe Maiko') && <div className="favorite-badge">FAVORITE</div>}
              </div>
            
              <div className="rating-display">
                <div className="google-rating">Google: {cafe.rating} ★</div>
                <div className="personal-rating">
                  My Rating: {
                    cafe.normalizedName === normalize('Matcha Cafe Maiko') ? '5.0' :
                    cafe.normalizedName === normalize('KIJITORA') ? '4.7' :
                    cafe.normalizedName === normalize("Isshiki Matcha") ? '4.0' :
                    '4.5'
                  } ★
                </div>
              </div>
              <button 
                className="view-details"
                onClick={() => {
                  if (cafe.website) {
                    window.open(cafe.website, '_blank');
                  }
                }}
              >
                VIEW WEBSITE
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>

  );
}

export default Home;
