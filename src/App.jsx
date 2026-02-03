import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Conversation messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi, I am your React chatbot. Ask me anything!' },
  ]);

  // Current input value
  const [currentInput, setCurrentInput] = useState('');

  // Whether the bot is "typing"
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle text input change
  function handleInputChange(event) {
    setCurrentInput(event.target.value);
  }

  // Simple rule-based bot reply logic
  function getBotReply(userText) {
    const text = userText.toLowerCase();

    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello! How can I help you today?';
    }

    if (text.includes('time')) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}.`;
    }

    if (text.includes('date')) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString()}.`;
    }

    if (text.includes('help')) {
      return 'You can ask me about the time, date, or just say hello.';
    }

    return "I'm still learning. Try asking about the time or date.";
  }

  // Handle sending a message
  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsBotTyping(true);

    const botReplyText = getBotReply(trimmed);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 600);
  }

  return (
    <div className="app">
      <div className="chatbot">
        <header className="chatbot-header">
          <h1>
            Vicki Chatbot</h1>
        </header>

        <div className="messages-container">
          {messages.map(message => (
            <div
              key={message.id}
              className={
                'message ' +
                (message.sender === 'user' ? 'message-user' : 'message-bot')
              }
            >
              <div className="message-text">{message.text}</div>
            </div>
          ))}

          {isBotTyping && (
            <div className="message message-bot typing-indicator">
              <div className="message-text">Bot is typing...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={currentInput}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={!currentInput.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
