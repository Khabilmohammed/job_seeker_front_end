// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminHome from '../../Pages/Admin/AdminHome';
import UserManagement from '../../Pages/Admin/UserManagement';
import PostManagement from '../../Pages/Admin/PostManagement';
import JobPage from '../../Pages/Admin/JobPage';
import JobDetailsPage from '../../Pages/Admin/JobDetailsPage';
import ApplicantsPage from '../../Pages/Admin/ApplicantsPage';
import GetUserProfilePage from '../../Componenets/Shared/GetUserProfilePage';

const AdminRoutes = () => (
  <Routes>
  <Route
    path="adminHome"
    element={<ProtectedRoute element={<AdminHome />} allowedRoles={['admin']} />}
  />
 
  <Route
    path="usermanagement"
    element={<ProtectedRoute element={<UserManagement />} allowedRoles={['admin']} />}
  />

<Route
    path="postManagement"
    element={<ProtectedRoute element={<PostManagement />} allowedRoles={['admin']} />}
  />


<Route
    path="jobPage"
    element={<ProtectedRoute element={<JobPage />} allowedRoles={['admin']} />}
  />

<Route
      path="/jobDetailsPage/:jobId"
      element={<ProtectedRoute element={<JobDetailsPage />} allowedRoles={['admin']} />}
    />
    <Route
      path="getUserProfilePage/:userid"
      element={<ProtectedRoute element={<GetUserProfilePage />} allowedRoles={['admin']} />}
    />

<Route
      path="ApplicantsPage/:jobId/applicants"
      element={<ProtectedRoute element={<ApplicantsPage />} allowedRoles={['admin']} />}
    />
  {/* Add more admin routes as needed */}
</Routes>
);

export default AdminRoutes;
