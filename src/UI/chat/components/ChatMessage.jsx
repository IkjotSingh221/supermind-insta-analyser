import React from 'react';
import PropTypes from 'prop-types';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start space-x-4 max-w-4xl mx-auto mb-6"
    >
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
        <Bot className="h-6 w-6 text-white" />
      </div>
      <div className="p-4 rounded-3xl shadow-lg bg-white max-w-[75%] border border-gray-200">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" />
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce delay-150" />
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }) {
  if (message.isTyping) {
    return <TypingIndicator />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start space-x-4 max-w-4xl mx-auto mb-6 ${
        !message.isBot && 'flex-row-reverse space-x-reverse'
      }`}
    >
      <div
        className={`p-3 rounded-full ${
          message.isBot
            ? 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500'
            : 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500'
        }`}
      >
        {message.isBot ? (
          <Bot className="h-6 w-6 text-white" />
        ) : (
          <User className="h-6 w-6 text-white" />
        )}
      </div>
      <div
        className={`p-4 rounded-3xl shadow-lg ${
          message.isBot
            ? 'bg-white border border-gray-200'
            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
        } max-w-[75%]`}
      >
        <p className="text-base leading-relaxed">{message.text}</p>
        {message.timestamp && (
          <p className="text-xs text-gray-400 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string,
    isBot: PropTypes.bool.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    isTyping: PropTypes.bool,
  }).isRequired,
};

export default ChatMessage;
