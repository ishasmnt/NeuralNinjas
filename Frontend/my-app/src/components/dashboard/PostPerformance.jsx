import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const PostPerformance = ({ data }) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Post Type Performance</h3>

            <div style={{ height: '200px', width: '100%', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            stroke="#aaa"
                            width={60}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                        />
                        <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                {data.map((entry) => (
                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', color: '#ccc' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: entry.fill }}></div>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPerformance;
