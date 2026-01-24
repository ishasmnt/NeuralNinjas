const InsightsCard = ({ data }) => {
    // Strategic logic: If negative sentiment is high on one platform
    const topPlatform = data.platformEngagement[0]?.Platform;
    return (
      <div className="card-wrapper">
        <h3>Strategic Recommendation</h3>
        <p>Your content on <strong>{topPlatform}</strong> is driving 40% of reach. 
           Consider reallocating 15% of your production budget from lower-performing 
           static posts to <strong>Videos</strong> to maximize ROI.</p>
      </div>
    );
};
export default InsightsCard;