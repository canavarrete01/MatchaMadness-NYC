// CafeReviews.js
import React from 'react';

const CafeReviews = ({ cafes }) => {
  return (
    <div className="cafe-reviews-container">
      <h2>Matcha Cafe Reviews</h2>
      
      {cafes.map(cafe => (
        <div id={`cafe-${cafe.id}`} key={cafe.id} className="cafe-review-section">
          <h3>{cafe.name}</h3>
          <div className="cafe-info">
            <p><strong>Address:</strong> {cafe.address}</p>
            <p><strong>Borough:</strong> {cafe.borough}</p>
            <p><strong>Rating:</strong> ★ {cafe.rating}</p>
            {cafe.phone && <p><strong>Phone:</strong> {cafe.phone}</p>}
            {cafe.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={cafe.website} target="_blank" rel="noopener noreferrer">
                  {cafe.website}
                </a>
              </p>
            )}
          </div>
          
          <div className="reviews-list">
            <h4>Customer Reviews</h4>
            {cafe.reviews && cafe.reviews.length > 0 ? (
              cafe.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.author_name}</span>
                    <span className="review-rating">★ {review.rating}</span>
                    <span className="review-date">
                      {new Date(review.time * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeReviews;