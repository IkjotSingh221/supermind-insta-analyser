import React from 'react';
import { Bot, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ChatHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md px-6 py-4 rounded-b-xl">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
            <p className="text-sm text-gray-500">Always here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
