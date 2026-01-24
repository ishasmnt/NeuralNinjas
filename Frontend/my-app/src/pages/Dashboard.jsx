import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Download, Share2, Bot, Users, Heart, Repeat, Smile } from 'lucide-react';

// Components
import StatCard from '../components/dashboard/StatCard';
import EngagementChart from '../components/dashboard/EngagementChart';
import HeatMap from '../components/dashboard/HeatMap';
import TopPostsTable from '../components/dashboard/TopPostsTable';
import AnomalyAlert from '../components/dashboard/AnomalyAlert';

import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: [],
    platformEngagement: [],
    hourlyTrends: [],
    topPosts: [],
    alerts: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [overview, platforms, hours, preview] = await Promise.all([
          axios.get('http://127.0.0.1:8000/analytics/overview'),
          axios.get('http://127.0.0.1:8000/analytics/platform-comparison'),
          axios.get('http://127.0.0.1:8000/analytics/hourly-trends'),
          axios.get('http://127.0.0.1:8000/data-preview')
        ]);

        // CRITICAL FIX: Ensure platforms.data is an Array for Recharts
        const formattedPlatforms = Array.isArray(platforms.data) 
          ? platforms.data 
          : Object.entries(platforms.data).map(([name, value]) => ({ 
              Platform: name, 
              Total_Engagement: value 
            }));

        setData({
          stats: [
            { title: 'Total Reach', value: overview.data.total_posts, icon: <Users size={20} />, color: '#6366f1' },
            { title: 'Avg Likes', value: overview.data.avg_likes, icon: <Heart size={20} />, color: '#ec4899' },
            { title: 'Avg Retweets', value: overview.data.avg_retweets, icon: <Repeat size={20} />, color: '#22c55e' },
            { title: 'Sentiment', value: overview.data.sentiment_score > 0 ? 'Positive' : 'Neutral', icon: <Smile size={20} />, color: '#eab308' }
          ],
          platformEngagement: formattedPlatforms,
          hourlyTrends: hours.data || [],
          topPosts: Array.isArray(preview.data) ? preview.data : [],
          alerts: [
            { id: 1, type: 'success', message: 'Instagram engagement is up 15% this hour!' },
            { id: 2, type: 'warning', message: 'Low activity detected in the "Usa" region today.' }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error("Dashboard Data Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="dashboard-container"><h1 className="loading-text">Analyzing Social Buzz...</h1></div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Social Analytics</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            Visualizing real-time performance for your social buzz campaign.
          </p>
        </div>

        <div className="header-actions">
          <button className="action-btn outline"><Download size={18} /> Export</button>
          <button className="action-btn outline"><Share2 size={18} /> Share</button>
          <button className="action-btn primary" onClick={() => navigate('/assistant')}>
            <Bot size={18} /> AI Consultant
          </button>
        </div>
      </header>

      <section className="alerts-section">
        <AnomalyAlert alerts={data.alerts} />
      </section>

      <section className="stats-grid">
        {data.stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} {...stat} />
        ))}
      </section>

      <section className="main-grid">
        {/* FIX: Parent container must have a height for ResponsiveContainer */}
        <div className="card-wrapper span-2" style={{ minHeight: '400px' }}>
          <h3 className="section-title">Platform Engagement Breakdown</h3>
          <EngagementChart data={data.platformEngagement} />
        </div>

        <div className="card-wrapper" style={{ minHeight: '400px' }}>
          <h3 className="section-title">Best Posting Times (GMT)</h3>
          <HeatMap data={data.hourlyTrends} />
        </div>

        <div className="card-wrapper full-width">
          <h3 className="section-title">Top Performing Content</h3>
          <TopPostsTable posts={data.topPosts} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;