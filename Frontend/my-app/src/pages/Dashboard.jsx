import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/overview")
      .then(res => res.json())
      .then(data => setOverview(data))
      .catch(err => console.error(err));
  }, []);

  if (!overview) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <p>Total Posts: {overview.total_posts}</p>
      <p>Average Engagement Rate: {overview.avg_engagement_rate}%</p>
      <p>Platforms: {overview.platforms.join(", ")}</p>
    </div>
  );
}
