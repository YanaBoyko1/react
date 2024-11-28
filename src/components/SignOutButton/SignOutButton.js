import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // Якщо користувач не авторизований, перенаправити на /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
