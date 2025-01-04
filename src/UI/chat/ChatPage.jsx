import React from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { useChat } from './useChat';

function ChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatPage;