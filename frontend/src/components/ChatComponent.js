import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { apiUrl } from '../config';

// const socket = io('https://chat-lingo-backend.onrender.com');
const socket = io(apiUrl);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    };

    socket.on('chat message', handleNewMessage);
    
    // Cleanup
    return () => socket.off('chat message', handleNewMessage);
  }, []);

  return (
    <div>
      <ul id="messages">
        {chat.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          id="m"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
