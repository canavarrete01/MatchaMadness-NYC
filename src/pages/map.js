// pages/map.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import MatchaMapExpanded from '../components/matchamap-expanded';

function Map() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // <-- Add this

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

  // Filter cafes by borough
  const filteredCafes = selectedBorough === 'All'
    ? cafes
    : cafes.filter(cafe => cafe.borough === selectedBorough);

  // Further filter by search term (name only)
  const displayedCafes = filteredCafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading matcha cafes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gridTemplateRows: '1fr 1fr',
        gap: '32px 0',
        height: 'calc(100vh - 60px)',
        padding: '40px',
        background: '#faf8ee',
        boxSizing: 'border-box'
      }}
    >
      {/* Sidebar - vertically centered */}
      <div
        className="directory"
        style={{
          gridRow: '1 / span 2',
          gridColumn: '1 / 2',
          alignSelf: 'stretch',
          justifySelf: 'center',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          borderRadius: '18px',
          background: '#f6f6f6',
          boxShadow: '0 1px 8px rgba(44,204,64,0.07)',
          padding: '20px',
          border: '2px solid #a8bc87'
        }}
      >
        <h2 className="directory-title">Matcha Cafes</h2>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="borough-select" className="borough-label">Filter by Borough: </label>
          <select
            className="borough-select"
            id="borough-select"
            value={selectedBorough}
            onChange={e => {
              setSelectedBorough(e.target.value);
              setSelectedCafe(null);
            }}
          >
            <option value="All">All Boroughs</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="Bronx">Bronx</option>
            <option value="Staten Island">Staten Island</option>
          </select>
        </div>
        {/* Search input (name only) */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #a8bc87',
              fontSize: '16px'
            }}
          />
        </div>
        <div className="cafe-list">
          {displayedCafes.map(cafe => (
            <div
              key={cafe.id}
              className="cafe-card"
              style={{
                marginBottom: '20px',
                padding: '10px',
                background: selectedCafe && selectedCafe.id === cafe.id ? '#B5C99A' : '#fff',
                borderRadius: '8px',
                boxShadow: selectedCafe && selectedCafe.id === cafe.id
                  ? '0 0 12px 2px #9e9e9e57, 0 1px 4px rgba(0,0,0,0.05)'
                  : '0 1px 4px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s'
              }}
              onClick={() => setSelectedCafe(cafe)}
            >
              <h3 className="cafe-name">{cafe.name}</h3>
              <p className="cafe-address">{cafe.address}</p>
              <p className="cafe-rating">Rating: {cafe.rating} ({cafe.user_ratings_total} reviews)</p>
              {cafe.website && (
                <p className="cafe-website">
                  <a href={cafe.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map - top right, horizontally centered */}
      <div
        style={{
          gridRow: '1 / 2',
          gridColumn: '2 / 3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '700px', // Set a fixed width for consistency
          height: '400px',
          borderRadius: '18px',
          overflow: 'scroll',
          boxShadow: '0 1px 8px rgba(44,204,64,0.07)',
          marginBottom: '20px',
        }}>
          <MatchaMapExpanded
            cafes={filteredCafes}
            selectedCafe={selectedCafe}
            setSelectedCafe={setSelectedCafe}
            selectedBorough={selectedBorough}
          />
        </div>
      </div>

      {/* Reviews - bottom right, horizontally centered */}
      <div
        style={{
          gridRow: '2 / 3',
          gridColumn: '2 / 3',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'scroll',
          padding: '10px',
          height: '100%', // fills grid row height
          boxSizing: 'border-box'
        }}
      >
        {selectedCafe && selectedCafe.reviews && selectedCafe.reviews.length > 0 && (
          <div style={{
            width: '650px', // Match the map width
            marginTop: '0',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #a8bc87',
            boxShadow: '0 1px 6px rgba(201, 250, 207, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px',

          }}>
            <h3 style={{ marginBottom: '12px', textAlign: 'center' }}>Reviews for {selectedCafe.name}</h3>
            <ReviewList reviews={selectedCafe.reviews} />
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewList({ reviews }) {
  // Filter reviews to only those containing "matcha" (case-insensitive)
  const matchaReviews = reviews
    .filter(review => review.text && review.text.toLowerCase().includes('matcha'))
    .sort((a, b) => b.rating - a.rating) // Highest rated first
    .slice(0, 5); // Top 5

  return (
    <div style={{
      maxHeight: '300px',
      overflowY: 'auto',
      paddingRight: '8px'
    }}>
      {matchaReviews.length === 0 ? (
        <div>Sorry, no reviews mentioning "matcha" found!</div>
      ) : (
        matchaReviews.map((review, idx) => (
          <div key={idx} style={{
            marginBottom: '18px',
            padding: '12px',
            borderRadius: '8px',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(44,204,64,0.07)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {review.author_name} &mdash; <span style={{ color: '#2ecc40' }}>★ {review.rating}</span>
            </div>
            <div style={{ fontStyle: 'italic', marginBottom: '6px' }}>
              {review.relative_time_description}
            </div>
            <div>{review.text}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Map;