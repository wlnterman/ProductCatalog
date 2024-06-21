// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { getCurrentUser } from '../services/authService';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const user = getCurrentUser();

//   if (!user) return <Navigate to="/login" replace />;
//   return <>{children}</>;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserDecodedToken } from '../services/authService';
//123import { useAuth } from './authContext';
import { UserRoles } from '../types';
import { useAuth } from './Context/authContext2';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles : UserRoles[] }) => {
  const token = getCurrentUserDecodedToken();
  const { currentUser, isLoading, isTokenExpired, logoutUser } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Или ваш компонент загрузки
  }

  //logout on token expire
  if (token) {
    if (isTokenExpired(token)) {
      logoutUser();
      return <Navigate to="/login" />;
    }
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  
  if (roles && roles.indexOf(currentUser.role) === -1) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;