// pages/about.js
import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2d5016', marginBottom: '20px' }}>About Matcha Madness NYC</h1>
      
      <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
        Welcome to Matcha Madness NYC, a guide to find your next favorite matcha cafe in New York City.
        Matcha Madness NYC began as a passion project to find and share the best matcha spots in the city. 
        Through this website, I hope to share the love for the drink and help others find their perfect matcha, no matter what borough.
        Have fun exploring Matcha Madness NYC and happy sipping!
      </p>

      {/* Developer Notes and How its Made */}
      <h2 style={{ color: '#2d5016', marginTop: '30px', marginBottom: '15px' }}>How It's Made</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        This website is built using React and Node.js, with its backend powered by MongoDB and Google Maps API for location services.
        Find more on the front end of this website on <a href="https://github.com/canavarrete01/MatchaMadness-NYC" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>

      <h2 style={{ color: '#2d5016', marginTop: '30px', marginBottom: '15px' }}>About the Creator</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        Hi! I'm Carolina Navarrete, a certfied matcha obssessed tech nerd based in New York City. 
        I am a matcha latte aficionado who recently moved to NYC and quickly became enamored with the city's plethora of matcha cafes to choose from. 
        Having kept a running notes app list on my phone, I thought there must be a more efficient way to share my love for the drink with friends. What better way to combine wanting share my favorite cafes with friends + my love for website design than to build an excessively complicated website?
        This project was a labor of love, with the idea, design, and development all done by me in my free time after working full time as a data specialist.
        <br /><br />
        Find more information about me on my <a href="https://www.linkedin.com/in/carolina-navarrete-a764b3285/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and my <a href="https://canavarrete01.github.io/" target="_blank" rel="noopener noreferrer">website portfolio</a> which I also built!
      </p>

      {/* Photo */}
      {/* <h3 style={{ color: '#2d5016', marginTop: '30px', marginBottom: '15px' }}>As proof of my devotion to matcha, a collage:</h3> */}
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <img src="/cafe_photos/collage.png" alt="Carolina Navarrete" style={{ borderRadius: '10px', maxWidth: '70%', height: 'auto' }} />
      </div>

    </div>
  );
}

export default About;