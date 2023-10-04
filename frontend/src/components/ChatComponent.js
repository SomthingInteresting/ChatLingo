import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from '../utils/authService';
import { io } from 'socket.io-client';
import { apiUrl } from '../config';

const socket = io(apiUrl);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "Anonymous");
      } else {
        // Handle user sign out or no user being signed in
      }
    });
  }, [auth]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', { username, text: message });
    setMessage('');
  };

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    };

    socket.on('chat message', handleNewMessage);

    return () => socket.off('chat message', handleNewMessage);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <ul id="messages">
        {chat.map((msg, idx) => (
          <li key={idx}>{msg.username}: {msg.text}</li>
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
