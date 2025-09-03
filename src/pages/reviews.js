import React, { useState, useEffect } from 'react';

function Rankings() {
  const [cafes, setCafes] = useState([]);
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [selectedStars, setSelectedStars] = useState(5);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' or 'reviews'

  useEffect(() => {
    const fetchCafes = async () => {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE_URL}/api/places`);
      const data = await response.json();
      setCafes(data);
    };
    fetchCafes();
  }, []);

  // Filter cafes by borough and star rating
  let filteredCafes = cafes
    .filter(cafe =>
      (selectedBorough === 'All' || cafe.borough === selectedBorough) &&
      Math.round(cafe.rating) === selectedStars
    );

  // Sort by rating or most reviews
  if (sortBy === 'rating') {
    filteredCafes = filteredCafes.sort((a, b) => b.rating - a.rating);
  } else {
    filteredCafes = filteredCafes.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Top Rated Matcha Cafes</h1>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div>
          <label htmlFor="borough-select">Borough: </label>
          <select
            id="borough-select"
            value={selectedBorough}
            onChange={e => setSelectedBorough(e.target.value)}
          >
            <option value="All">All Boroughs</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="Bronx">Bronx</option>
            <option value="Staten Island">Staten Island</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-select">Sort By: </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="rating">Highest Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>
      {filteredCafes.length === 0 ? (
        <p>No cafes found for this selection.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCafes.map(cafe => (
            <li key={cafe._id} style={{
              marginBottom: '18px',
              padding: '16px',
              borderRadius: '10px',
              background: '#fdfff7ff',
              boxShadow: '0 1px 4px rgba(44,204,64,0.07)'
            }}>
              <h3 style={{ margin: 0 }}>{cafe.name}</h3>
              <div>★ {cafe.rating} ({cafe.user_ratings_total} reviews)</div>
              <div>{cafe.formatted_address}</div>
              <div>Borough: {cafe.borough}</div>
              {cafe.website && (
                <div>
                  <a href={cafe.website} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rankings;