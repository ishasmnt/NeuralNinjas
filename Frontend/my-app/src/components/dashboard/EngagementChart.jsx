import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Area, AreaChart 
} from 'recharts';

const EngagementChart = ({ data }) => {
  return (
    <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '400px', 
        display: 'flex',
        flexDirection: 'column',
        position: 'relative' 
    }}>
        <h3 style={{ margin: 0, color: '#e0e7ff', marginBottom: '20px' }}>
          Engagement Trends
        </h3>
        
      <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    
                    {/* KEY FIX: dataKey must match your formattedPlatforms keys */}
                    <XAxis 
                        dataKey="Platform" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                    />
                    
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#0f172a', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                        }} 
                    />

                    {/* KEY FIX: dataKey must match 'Total_Engagement' */}
                    <Area 
                        type="monotone" 
                        dataKey="Total_Engagement" 
                        stroke="#6366f1" 
                        fillOpacity={1} 
                        fill="url(#colorEngage)" 
                        strokeWidth={3}
                    />
    <defs>
        <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
        </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
    <XAxis dataKey="Platform" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px' }} />
    
    {/* Utilization of Sentiment Feature */}
    <Area 
        type="monotone" 
        dataKey="Positive_Count" 
        stackId="1" 
        stroke="#22d3ee" 
        fill="url(#colorPos)" 
    />
    <Area 
        type="monotone" 
        dataKey="Negative_Count" 
        stackId="1" 
        stroke="#f87171" 
        fill="rgba(248, 113, 113, 0.3)" 
    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default EngagementChart;