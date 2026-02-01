import { useState } from 'react';

export const useChat = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your AI Strategy Consultant. Ask me anything about your social media performance.", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (text) => {
        // Add user message immediately
        const userMsg = { text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/ai/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: text }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();

            if (data.success) {
                const aiMsg = { text: data.answer, sender: 'ai' };
                setMessages(prev => [...prev, aiMsg]);
            } else {
                throw new Error('AI response was not successful');
            }

        } catch (err) {
            console.error("Chat error:", err);
            setError(err.message);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the AI right now.", sender: 'ai', isError: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    return { messages, isTyping, sendMessage, error };
};
