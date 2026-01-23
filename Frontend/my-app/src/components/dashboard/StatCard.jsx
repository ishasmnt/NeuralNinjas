import React from 'react';
import { Users, Activity, TrendingUp, Video } from 'lucide-react';

const iconMap = {
    Users,
    Activity,
    TrendingUp,
    Video
};

const StatCard = ({ title, value, trend, isPositive, icon }) => {
    const Icon = iconMap[icon] || Activity;

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{title}</span>
                <div style={{
                    background: 'rgba(100, 108, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#646cff'
                }}>
                    <Icon size={20} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '600' }}>{value}</h3>
                <span style={{
                    color: isPositive ? '#4ade80' : '#f87171',
                    fontSize: '0.9rem',
                    paddingBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {isPositive ? '▲' : '▼'} {trend}
                </span>
            </div>
        </div>
    );
};

export default StatCard;
