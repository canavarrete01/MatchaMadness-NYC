import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_URL = `${API_BASE_URL}/api/matcha-cafes`;


function MatchaMapPage() {
    const [cafes, setCafes] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCafes(data))
            .catch(err => console.error('Failed to fetch cafes:', err));
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: 350,
                overflowY: 'auto',
                borderRight: '1px solid #eee',
                background: '#fafafa',
                padding: 20
            }}>
                <h2>Matcha Cafes</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cafes.map(cafe => (
                        <li
                            key={cafe.id}
                            style={{
                                marginBottom: 16,
                                cursor: 'pointer',
                                background: selectedCafe && selectedCafe.id === cafe.id ? '#e0ffe0' : 'transparent',
                                borderRadius: 6,
                                padding: 8
                            }}
                            onClick={() => setSelectedCafe(cafe)}
                        >
                            <strong>{cafe.name}</strong>
                            <div>{cafe.address}</div>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Map and Details */}
            <main style={{ flex: 1, position: 'relative' }}>
                {/* Placeholder for map - replace with your map component (e.g., Google Maps, Mapbox) */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#d0f0c0',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        background: 'white',
                        padding: 12,
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <strong>Map goes here</strong>
                        <div style={{ fontSize: 12, color: '#888' }}>
                            (Integrate your map library)
                        </div>
                    </div>
                    {selectedCafe && (
                        <div style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            background: 'white',
                            padding: 16,
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}>
                            <h3>{selectedCafe.name}</h3>
                            <div>{selectedCafe.address}</div>
                            <div>{selectedCafe.description}</div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MatchaMapPage;