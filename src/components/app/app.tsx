import React from 'react';
import ToDoList from '../ToDoList/ToDoList';
import Login from '../Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<ToDoList />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
