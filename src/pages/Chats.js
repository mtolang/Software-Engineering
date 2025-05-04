import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chats.css"; // Import the new CSS file

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
    } else if (lowerCaseMessage.includes("donate")) {
      return `You can send your donations to the following bank accounts:\n
      - **Asia United Bank**: 326-11-000658-7\n
      - **BDO Network Bank**: 040020074239\n
      - **BDO Unibank**: 003250299159\n
      - **MetroBank**: 665-3-66509642-5\n
      Thank you for your support!`;
    } else {
      return "I'm sorry, I can only answer questions related to the Alumni Portal. Please try asking about events, surveys, jobs, or donations.";
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h1 className="chat-title">ALUMNI PORTAL</h1>
        <div className="chat-section">
          <h2 className="chat-subtitle">Chats</h2>
          <ul className="chat-list">
            <li className="chat-list-item">Alumni Chatbot</li>
          </ul>
        </div>
        <button className="chat-back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {/* Chat Header */}
        <div className="chat-header">
          <h2 className="chat-header-title">Alumni Chatbot</h2>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "user" ? "chat-message-user" : "chat-message-bot"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="chat-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatStatic;