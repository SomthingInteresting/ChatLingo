// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import HomeComponent from './components/HomeComponent';
import { observeAuth } from './utils/authService';


function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const unsubscribe = observeAuth(setUser); // Start observing the auth state

    return () => {
      unsubscribe(); // Stop observing the auth state when the component is unmounted
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/home" element={isLoggedIn ? <HomeComponent /> : <Navigate to="/" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
