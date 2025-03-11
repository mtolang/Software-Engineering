import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatStatic = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-pink-500 text-white p-4">
        <h1 className="text-xl font-bold">ALUMNI PORTAL</h1>
        <div className="mt-6">
          <h2 className="font-semibold">Chats</h2>
          <ul className="mt-4 space-y-2">
            <li className="bg-pink-700 p-2 rounded">Isaiah Royce Valdez</li>
            <li>LeBron James</li>
            <li>Stephen Curry</li>
            <li>Kevin Durant</li>
            <li>Anthony Edwards</li>
          </ul>
        </div>
        <button
          className="mt-6 bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-gray-100">
        <div className="bg-gray-200 p-4 flex justify-between">
          <h2 className="font-bold">LeBron James</h2>
          <div className="flex space-x-2">
            <button className="bg-pink-500 text-white px-4 py-2 rounded">Call</button>
            <button className="bg-gray-300 p-2 rounded-full">...</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-pink-200 p-2 rounded-lg max-w-xs">Hi Martin!</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-pink-200 p-2 rounded-lg max-w-xs">
              How are you? I hope you're doing well. There's an upcoming CCS event, will you go?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-pink-400 p-2 rounded-lg max-w-xs">Hello James, I'm okay. Yes I will go. How about you?</div>
          </div>
          <div className="flex justify-end">
            <div className="bg-pink-400 p-2 rounded-lg max-w-xs">See you!</div>
          </div>
        </div>

        {/* Message Input */}
        <div className="flex items-center p-4 bg-gray-200">
          <button className="bg-pink-500 text-white px-4 py-2 rounded">+</button>
          <input
            type="text"
            className="flex-1 mx-2 p-2 border rounded"
            placeholder="Type text"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatStatic;