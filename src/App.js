import React from 'react';
import './App.css';
import MatchaMap from './matchamap'; // Import the new map component

function App() {
  return (
    <div className="App">
      {/* Border with dots at the top */}
      <div className="border-dots">
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

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>DISCOVER<br />MATCHA<br />SPOTS</h1>
            <p>Find the best matcha cafes in Manhattan with our curated map and rating system</p>
            <button className="explore-button">EXPLORE ALL CAFES</button>
          </div>
          <div className="hero-map">
            <MatchaMap />
          </div>
        </div>

        {/* Cafe Categories */}
        <div className="cafe-categories">
          <div className="category-labels">
            <span>TOP RATED</span>
            <span>NEWEST</span>
            <span>TRADITIONAL</span>
            <span>MODERN</span>
            <span>FAVORITES</span>
          </div>
        </div>

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