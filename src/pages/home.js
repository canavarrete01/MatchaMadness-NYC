import React, { useState, useEffect } from 'react';
import '../App.css';
import MatchaMap from '../components/matchamap'; // google map component
// import CafeReviews from './CafeReviews';

function Home() {
     // Test API Integration
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
    
    
     // Main App Container
    return (
      <div className="Home">

    <div className="hero-section">
      <div className="hero-text centered">
        <h1 className = "hero-text">MATCHA<br />MADNESS<br />NYC</h1>
        <p className="hero-text"> Find the best matcha cafes in your borough with our curated map and rating system</p>
        <div>
          <button
            onClick={() => window.location.href = '/map'} 
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
        <MatchaMap cafes={cafes} />
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

  <div className = "content-section">
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
        <h2 className = "cafe-name">{cafe.name.toUpperCase()}</h2>

        <div className={`cafe-image`}>
          <img className = 'cafe-image'
            src={cafeImages[cafe.name] || '/cafe_photos/nanas.png'} //nana's photo since the original name has a hyphen
            alt={cafe.name} 
          />
        {cafe.name === 'Matcha Cafe Maiko' && <div className="favorite-badge">FAVORITE</div>}
        </div>
      
        <div className="rating-display">
          <div className="google-rating">Google: {cafe.rating} ★</div>
          <div className="personal-rating">
            My Rating: {
              cafe.name === 'Matcha Cafe Maiko' ? '5.0' :
              cafe.name === 'KIJITORA' ? '4.7' :
              cafe.name === "Nana's Green Tea" ? '4.4' :
              '4.5'
            } ★
          </div>
        </div>
        <button 
          className="view-details"
          onClick={() => window.location.href = `/details/${cafe.id}`}
        >
          VIEW DETAILS
        </button>
      </div>
    ))}


  </div>
</div>
</div>
);
}

export default Home;