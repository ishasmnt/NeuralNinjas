import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, trend, icon, color, isPositive }) => {
  // If trend isn't passed, we can calculate a default check
  const positiveTrend = isPositive ?? trend?.includes('+');

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="card-title">{title}</span>
        {/* Render the icon passed from Dashboard directly */}
        <div style={{ 
          background: `${color}20`, 
          padding: '8px', 
          borderRadius: '10px', 
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon} 
        </div>
      </div>

      <div className="card-value">{value}</div>
      
      {trend && (
        <div className="card-trend" style={{ color: positiveTrend ? '#22d3ee' : '#f87171' }}>
          {positiveTrend ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      )}
    </div>
  );
};

export default StatCard;