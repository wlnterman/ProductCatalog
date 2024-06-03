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
import { getCurrentUserToken } from '../services/authService';
import { useAuth } from './authContext';
import { UserRoles } from '../types';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles : UserRoles[] }) => {
  const user = getCurrentUserToken();
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
 
  if (roles && roles.indexOf(currentUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) === -1) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;