// import { useState, useCallback } from 'react';

// const TYPING_DURATION = 2000;

// const botResponses = [
//   "I understand you need help. Let me assist you with that. What specific information are you looking for?",
//   "That's an interesting question. Could you provide more details about what you're trying to achieve?",
//   "I'll help you with that. Could you elaborate a bit more on your requirements?",
//   "I see what you're asking. Let me gather some information to better assist you.",
// ];

// export function useChat() {
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       text: "👋 Hi there! I'm your AI assistant. How can I help you today?", 
//       isBot: true,
//       timestamp: new Date()
//     }
//   ]);

//   const getRandomResponse = useCallback(() => {
//     const randomIndex = Math.floor(Math.random() * botResponses.length);
//     return botResponses[randomIndex];
//   }, []);

//   const sendMessage = useCallback((text) => {
//     const newMessage = {
//       id: Date.now(),
//       text,
//       isBot: false,
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, newMessage]);
    
//     // Add typing indicator
//     setMessages(prev => [...prev, { id: 'typing', isTyping: true, isBot: true }]);
    
//     // Simulate bot response
//     setTimeout(() => {
//       setMessages(prev => prev.filter(msg => !msg.isTyping));
//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: getRandomResponse(),
//         isBot: true,
//         timestamp: new Date()
//       }]);
//     }, TYPING_DURATION);
//   }, [getRandomResponse]);

//   return {
//     messages,
//     sendMessage
//   };
// }

import { useState, useCallback } from "react";

const API_URL = "https://crustdata.onrender.com/run-flow"; // Replace with your backend URL

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi there! I’m here to assist you with any API-related queries. How can I help you today?",
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
      // Make API request to the FastAPI endpoint
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text, // User's message
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      console.log("Response:", data.outputs[0].outputs[0].artifacts.message);
      const botMessage = {
        id: Date.now() + 1,
        text: data.outputs[0].outputs[0].artifacts.message || "Sorry, I couldn't process that request.",
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