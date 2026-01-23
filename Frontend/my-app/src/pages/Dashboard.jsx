import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Download, Share2, Bot } from 'lucide-react';

// Components
import StatCard from '../components/dashboard/StatCard';
import EngagementChart from '../components/dashboard/EngagementChart';
import PostPerformance from '../components/dashboard/PostPerformance';
import HeatMap from '../components/dashboard/HeatMap';
import TopPostsTable from '../components/dashboard/TopPostsTable';
import AnomalyAlert from '../components/dashboard/AnomalyAlert';

// Data
import { mockDashboardData } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data] = useState(mockDashboardData);

  return (
    <div className="dashboard-container">
      {/* 1. Header / Summary Section */}
      <header className="dashboard-header">
        <div>
          <h1 style={{ marginBottom: '5px' }}>Social Analytics</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Welcome back, Creator! Here's what's happening today.</p>
        </div>

        <div className="header-actions">
          <button className="action-btn outline">
            <Download size={18} /> Export
          </button>
          <button className="action-btn outline">
            <Share2 size={18} /> Share
          </button>
          <button className="action-btn primary" onClick={() => navigate('/assistant')}>
            <Bot size={18} /> AI Consultant
          </button>
        </div>
      </header>

      {/* 6. Anomaly Detection Alerts */}
      <section className="alerts-section">
        <AnomalyAlert alerts={data.alerts} />
      </section>

      {/* 1. Header Widgets / Cards */}
      <section className="stats-grid">
        {data.stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="main-grid">
        {/* 2. Engagement Trends */}
        <EngagementChart data={data.engagementHistory} />

        {/* 4. Post Type Performance */}
        <PostPerformance data={data.postPerformance} />

        {/* 3. Best Time Heatmap */}
        <HeatMap data={data.bestTimes} />

        {/* 5. Top Performing Posts */}
        <TopPostsTable posts={data.topPosts} />
      </section>

    </div>
  );
};

export default Dashboard;