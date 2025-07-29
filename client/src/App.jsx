import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// List of nice Tailwind color classes
const COLORS = [
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-pink-200',
  'bg-purple-200',
  'bg-red-200',
  'bg-indigo-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-lime-200',
  'bg-cyan-200',
  'bg-fuchsia-200',
];

// Simple hash function to assign a color index
function getColorIndex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % COLORS.length;
}

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setMyId(socket.id);
    });
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', { text: message, sender: socket.id });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Encrypted Chat App</h1>
      <div className="w-full max-w-md bg-white rounded shadow p-4 mb-4">
        <div className="h-64 overflow-y-auto mb-2 border rounded p-2 bg-gray-50">
          {messages.map((msg, idx) => {
            const colorClass = COLORS[getColorIndex(msg.sender || '')];
            const isMe = msg.sender === myId;
            return (
              <div
                key={idx}
                className={`mb-2 px-2 py-1 rounded block w-fit ${colorClass} ${isMe ? 'font-bold border border-blue-400' : ''}`}
                title={msg.sender}
              >
                {msg.text || msg}
              </div>
            );
          })}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App; 