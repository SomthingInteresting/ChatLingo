import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import HomeComponent from './components/HomeComponent';
import LogoutComponent from './components/LogoutComponent';
import ChatComponent from './components/ChatComponent';
import { observeAuth } from './utils/authService';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const unsubscribe = observeAuth(setUser);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/home" element={isLoggedIn ? <HomeComponent /> : <Navigate to="/" />} />
        <Route path="/chat" element={<ChatComponent />} /> {/* Updated line */}
        <Route path="/logout" element={<LogoutComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
