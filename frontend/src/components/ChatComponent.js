import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/authService';
import { io } from 'socket.io-client';
import { apiUrl } from '../config';

const socket = io(apiUrl);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
      <button onClick={handleLogout}>Logout</button> {/* Adding logout button */}
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
