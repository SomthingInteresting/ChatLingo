// src/components/HomeComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/authService';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome to ChatLingo!</h2>
      <p>Your dashboard will be here. You can see active chats, start a new chat, or view online users.</p>
      <Link to="/chat">Go to Chat</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeComponent;
