import React, { useState } from "react";

export default function Assistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const res = await fetch("http://127.0.0.1:8000/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Ask a question..."
      />
      <button onClick={handleAsk} className="bg-blue-500 text-white px-4 py-2">
        Ask
      </button>
      {answer && <p className="mt-4"><strong>Answer:</strong> {answer}</p>}
    </div>
  );
}
