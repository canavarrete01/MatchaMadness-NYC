import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from "./pages/about";
import Map from "./pages/map";
import Rankings from "./pages/reviews";
import Home from "./pages/home";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar - shows on all pages */}
        <nav className="navbar">
          <div className="title-logo">Matcha Madness NYC</div>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
            <Link to="/map" onClick={() => setMenuOpen(false)}>MAP</Link>
            <Link to="/rankings" onClick={() => setMenuOpen(false)}>RANKINGS</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
          </div>
          <div className="favorites-icon">🍵</div>
        </nav>

        {/* Page content - only ONE shows at a time */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Footer - shows on all pages */}
        <footer>
          <div className="footer-links">
            <Link to="/map">Matcha Map</Link>
          </div>
          <div className="footer-links">
            <Link to="/rankings">Ranking Cafes</Link>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
          </div>

          <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #ccc' }} />
          
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Matcha Madness NYC. Designed &amp; Built by Carolina Navarrete.
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;