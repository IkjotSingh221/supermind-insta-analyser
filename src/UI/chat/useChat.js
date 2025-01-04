import { useState, useCallback } from 'react';

const TYPING_DURATION = 2000;

const botResponses = [
  "I understand you need help. Let me assist you with that. What specific information are you looking for?",
  "That's an interesting question. Could you provide more details about what you're trying to achieve?",
  "I'll help you with that. Could you elaborate a bit more on your requirements?",
  "I see what you're asking. Let me gather some information to better assist you.",
];

export function useChat() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hi there! I'm your AI assistant. How can I help you today?", 
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const getRandomResponse = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  }, []);

  const sendMessage = useCallback((text) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Add typing indicator
    setMessages(prev => [...prev, { id: 'typing', isTyping: true, isBot: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: getRandomResponse(),
        isBot: true,
        timestamp: new Date()
      }]);
    }, TYPING_DURATION);
  }, [getRandomResponse]);

  return {
    messages,
    sendMessage
  };
}