import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../CustomHook/useAuth'; 
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  element: React.ReactElement; 
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated } = useAuth(); // Destructure isAuthenticated from the hook
  const userRole = useSelector((state: Rootstate) => state.userAuthStore.role);
  console.log(userRole)
  // Check if the user is authenticated and has the right role
  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/" replace />; 
  }

  return element; // Render the protected element
};


export default ProtectedRoute;
