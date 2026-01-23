import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch logic will go here
    const mockData = [
      { name: 'Mon', engagement: 400 },
      { name: 'Tue', engagement: 700 },
      { name: 'Wed', engagement: 1200 },
      { name: 'Thu', engagement: 900 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Performance Overview</h1>
        <button className="refresh-btn">Update Data</button>
      </header>

      <div className="stats-grid">
        <Card title="Total Reach" value="24.5k" trend="+12%" />
        <Card title="Avg. Engagement" value="4.8%" trend="+0.5%" />
        <Card title="Top Format" value="Reels" trend="Stable" />
      </div>

      <div className="chart-section">
        <h3>Engagement Trends</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;