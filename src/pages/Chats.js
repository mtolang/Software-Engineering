import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatStatic = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to the Alumni Portal! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  // Function to handle sending messages
  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Simulate bot response
    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    }, 1000);

    setInput(""); // Clear input field
  };

  // Function to generate bot responses
  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("event")) {
      return "You can check the Events section for upcoming alumni events.";
    } else if (lowerCaseMessage.includes("survey")) {
      return "Surveys are available in the Survey section. Feel free to participate!";
    } else if (lowerCaseMessage.includes("job")) {
      return "Visit the Jobs section to explore job opportunities for alumni.";
    } else if (lowerCaseMessage.includes("donation")) {
      return "You can contribute through the Donations section. Thank you for your support!";
    } else {
      return "I'm sorry, I can only answer questions related to the Alumni Portal. Please try asking about events, surveys, jobs, or donations.";
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-pink-500 text-white p-4">
        <h1 className="text-xl font-bold">ALUMNI PORTAL</h1>
        <div className="mt-6">
          <h2 className="font-semibold">Chats</h2>
          <ul className="mt-4 space-y-2">
            <li className="bg-pink-700 p-2 rounded">Alumni Chatbot</li>
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
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <h2 className="font-bold">Alumni Chatbot</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.sender === "user"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center p-4 bg-gray-800">
          <input
            type="text"
            className="flex-1 mx-2 p-2 border rounded bg-gray-700 text-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatStatic;