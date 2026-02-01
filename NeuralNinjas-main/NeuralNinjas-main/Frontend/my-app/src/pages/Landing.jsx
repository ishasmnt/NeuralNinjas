import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="title">TrendSight</h1>
        <p className="subtitle">🚀 Hack the Space</p>
<div className="hero-buttons">
  <button onClick={() => navigate("/dashboard")}>
    Go to Dashboard
  </button>

  <button
    className="outline"
    onClick={() => navigate("/auth")}
  >
    Login
  </button>
</div>
      
        <h2 className="tagline">
          AI-Powered Unified Social Media Intelligence Dashboard
        </h2>

        <p className="description">
          Turns social media data into <span>clear decisions</span>,{" "}
          <span>smarter content</span>, and <span>consistent growth</span>.
        </p>


      </section>

      {/* PLATFORMS */}
      <section className="section">
        <h2>Unified Analytics Platform</h2>
        <p>One intelligent dashboard for all platforms</p>

        <div className="platforms">
          <span>Instagram</span>
          <span>TikTok</span>
          <span>YouTube</span>
          <span>LinkedIn</span>
          <span>X</span>
        </div>
      </section>

      {/* AI EXPLANATION */}
      <section className="section dark">
        <h2>Beyond Metrics → Actionable Intelligence</h2>
        <ul>
          <li>What happened</li>
          <li>Why it happened</li>
          <li>What to do next</li>
        </ul>

        <p className="nlp">
          Ask in simple English → get clear, data-backed answers
        </p>
      </section>

      {/* FEATURES */}
      <section className="section">
        <h2>Key Features</h2>
        <div className="features">
          <div>Cross-platform analytics</div>
          <div>AI content insights</div>
          <div>Best time & format suggestions</div>
          <div>Audience engagement analysis</div>
          <div>Auto weekly & monthly summaries</div>
          <div className="premium">
            Premium: Download reports (PDF)
          </div>
        </div>
      </section>

      {/* DECISION ENGINE */}
      <section className="section dark">
        <h2>Decision-to-Action Engine</h2>
        <p>Ready-to-execute strategies:</p>

        <div className="actions">
          <span>Posting Time</span>
          <span>Content Format</span>
          <span>Caption Style</span>
          <span>Hashtags</span>
        </div>
      </section>

      {/* CONTENT DNA */}
      <section className="section">
        <h2>Content DNA Memory</h2>
        <p>
          Learns audience behavior & brand patterns → smarter recommendations
          over time.
        </p>
      </section>

      {/* CUSTOMER SEGMENTS */}
      <section className="section dark">
        <h2>Who Is TrendSight For?</h2>
        <div className="customers">
          <div>Individual Creators</div>
          <div>SMBs</div>
          <div>Marketing Agencies</div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="footer">
        <h2>Ready to Hack the Social Media Space?</h2>
        <button onClick={() => navigate("/dashboard")}>
          Launch TrendSight 🚀
        </button>
      </footer>
    </div>
  );
};

export default Landing;
