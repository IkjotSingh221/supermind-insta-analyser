import { useState, useCallback } from "react";

const API_URL = "http://localhost:8000/chat"; // Replace with your backend URL

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi there! I’m here to assist you with any Social Media Insights related queries. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const sendMessage = useCallback(async (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Add typing indicator
    setMessages((prev) => [
      ...prev,
      { id: "typing", isTyping: true, isBot: true },
    ]);

    try {
      const payload = { message: text };
      console.log("Payload being sent to the backend:", payload);

      // Make API request to the FastAPI endpoint
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: data || "Sorry, I couldn't process that request.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.filter((msg) => !msg.isTyping));
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Something went wrong while connecting to the server. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.filter((msg) => !msg.isTyping));
      setMessages((prev) => [...prev, errorMessage]);
    }
  }, []);

  return {
    messages,
    sendMessage,
  };
}