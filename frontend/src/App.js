// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
