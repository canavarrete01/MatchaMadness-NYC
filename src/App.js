import React, { useState, useEffect } from 'react';
import './App.css';
import MatchaMap from './matchamap'; // Import the new map component
import CafeReviews from './CafeReviews';

function App() {
  // // Test API Integration
  // const [cafes, setCafes] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  
  // useEffect(() => {
  //   const fetchCafes = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('http://localhost:5050/api/places');
        
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch cafes');
  //       }
        
  //       const data = await response.json();
        
  //       // Transform data to match our component's format
  //       const formattedCafes = data.map(cafe => ({
  //         id: cafe._id,
  //         place_id: cafe.place_id,
  //         name: cafe.name,
  //         position: {
  //           lat: cafe.location.lat,
  //           lng: cafe.location.lng
  //         },
  //         rating: cafe.rating,
  //         address: cafe.formatted_address,
  //         borough: cafe.borough,
  //         reviews: cafe.reviews || [],
  //         website: cafe.website,
  //         phone: cafe.formatted_phone_number
  //       }));
        
  //       setCafes(formattedCafes);
  //     } catch (err) {
  //       setError(err.message);
  //       console.error('Error fetching cafes:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchCafes();
  // }, []);
  
  // if (loading) return <div className="loading">Loading matcha cafes...</div>;
  // if (error) return <div className="error">Error: {error}</div>;






  return (
    <div className="App">
      {/* Border with dots at the top */}
      <div className="dots">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="dot"></div>
        ))}
      </div>

      <div className="main-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">Matcha NYC</div>
          <div className="nav-links">
            <a href="#map">MAP</a>
            <a href="#rankings">RANKINGS</a>
            <a href="#about">ABOUT</a>
          </div>
          <div className="favorites-icon">🍵</div> 
        </nav>

        {/* Hero Section */ }
          <div className="hero-section">
            <div className="hero-text">
              <h1>DISCOVER<br />MATCHA<br />SPOTS</h1>
              <p>Find the best matcha cafes in Manhattan with our curated map and rating system</p>
             
              <div className="explore-button">
                <a href="/find-matcha">
            <span>Explore Matcha Cafes</span>
                </a>
              </div>
            </div>
            <div className="hero-map">
              <MatchaMap />
            </div>
          </div>

{/* 
          <section>
            <CafeReviews cafes={cafes} />
          </section>

            {/* Banner/Section Divider 
            <div className="scrolling-banner-wrapper">
              <div className="scrolling-banner">
                <span>TOP RATED • TOP RATED • TOP RATED • TOP RATED • TOP RATED • </span>
              </div>
            </div>
*/}
        {/* Featured Cafes Showcase */}
        <div className="cafe-showcase">
          {/* Cafe 1 */}
          <div className="cafe-card">
            <h2>CHA CHA MATCHA</h2>
            <div className="cafe-image cha-cha-image"></div>
            <div className="rating-display">
              <div className="google-rating">Google: 4.5 ★</div>
              <div className="personal-rating">My Rating: 5.0 ★</div>
            </div>
            <button className="view-details">VIEW DETAILS</button>
          </div>

          {/* Cafe 2 */}
          <div className="cafe-card">
            <h2>MATCHAFUL</h2>
            <div className="cafe-image matchaful-image"></div>
            <div className="rating-display">
              <div className="google-rating">Google: 4.6 ★</div>
              <div className="personal-rating">My Rating: 4.8 ★</div>
            </div>
            <button className="view-details">VIEW DETAILS</button>
          </div>

          {/* Cafe 3 */}
          <div className="cafe-card">
            <h2>CHALAIT</h2>
            <div className="cafe-image chalait-image">
              <div className="favorite-badge">FAVORITE</div>
            </div>
            <div className="rating-display">
              <div className="google-rating">Google: 4.4 ★</div>
              <div className="personal-rating">My Rating: 4.9 ★</div>
            </div>
            <button className="view-details">VIEW DETAILS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;