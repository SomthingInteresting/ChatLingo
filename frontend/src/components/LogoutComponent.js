import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/authService';

const LogoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/');
  }, [navigate]);

  return (
    <p>Logging out...</p>
  );
};

export default LogoutComponent;
