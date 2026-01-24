import React, { useState } from "react";
import axios from "axios";
import "./AssistantPage.css"; // ✅ import the CSS

const AssistantPage = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const res = await axios.get(
        `http://127.0.0.1:8000/analytics/ai/query`,
        { params: { query } }
      );

      console.log("AI RESPONSE:", res.data);
      setResponse(res.data.answer);
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Unable to fetch AI insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-container">
      <h2>AI Strategic Consultant 🤖</h2>

<input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. Which format performs best?"
      />
      <div className="chat-box">
        {loading
          ? "Analyzing patterns..."
          : response || "Ask me anything about your data"}
      </div>

      

      <button onClick={askAI}>Analyze</button>
    </div>
  );
};

export default AssistantPage;
