import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
