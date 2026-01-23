import React from 'react';

const HeatMap = ({ data }) => {
    // Mocking a simple grid for visual effect
    // In a real app, this would be a complex grid based on 7 days * 24 hours

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gridColumn: 'span 1'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Best Time to Post</h3>
                <div style={{ fontSize: '0.8rem', color: '#4ade80' }}>
                    Top: {data.day} {data.time}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px' }}>
                {Array.from({ length: 12 * 7 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            aspectRatio: '1',
                            backgroundColor: `rgba(100, 108, 255, ${Math.random() * 0.8 + 0.1})`,
                            borderRadius: '2px'
                        }}
                        title="Hour slot"
                    />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
                Low Engagement ⟶ High Engagement
            </div>
        </div>
    );
};

export default HeatMap;
