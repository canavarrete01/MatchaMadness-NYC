// pages/about.js
import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2d5016', marginBottom: '20px' }}>About Matcha Madness NYC</h1>
      
      <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
        Welcome to Matcha Madness NYC, your ultimate guide to the best matcha spots 
        in the Big Apple! We're passionate about helping you discover amazing matcha 
        experiences throughout New York City.
      </p>
      
      <h2 style={{ color: '#2d5016', marginTop: '30px', marginBottom: '15px' }}>Our Mission</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        To connect matcha lovers with the finest tea shops, cafes, and hidden gems 
        across NYC. Whether you're craving a traditional ceremonial matcha or a 
        trendy matcha latte, we've got you covered.
      </p>
      
      <h2 style={{ color: '#2d5016', marginTop: '30px', marginBottom: '15px' }}>What We Offer</h2>
      <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
        <li>Interactive map of matcha locations</li>
        <li>Rankings and reviews of the best spots</li>
        <li>Personal favorites and recommendations</li>
        <li>Up-to-date information on new openings</li>
      </ul>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f0f8e8', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', fontSize: '16px', color: '#2d5016' }}>
          🍵 Happy matcha hunting! 🍵
        </p>
      </div>
    </div>
  );
}

export default About;