import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import CompanyRoutes from './CompanyRoutes';
import UserRoutes from './UserRoutes';
import Login from '../../Pages/Login';
import Registration from '../../Pages/Registration';
import PageNotFound from '../../Pages/PageNotFound';
import OtpverificationPage from '../../Pages/OtpverificationPage';
import ForgetPassword from '../../Pages/ForgetPassword';
import ResetPassword from '../../Pages/ResetPassword';
import { AdminLayout } from '../../Pages/Admin/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import UserLayout from '../../Pages/User/UserLayout';
import CompanyLayout from '../../Pages/Company/CompanyLayout';
import LandingPage from '../../Pages/LandingPage';
import Loader from '../../Componenets/Loader/Loader'; 
const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  // Simulate initial loading (e.g., fetching data, authenticating user)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after initial load
    }, 2500); // Set this duration based on your actual loading time

    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading
  if (loading) {
    return <Loader />; // Show loader
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/otpverificationPage" element={<OtpverificationPage />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      
      <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} allowedRoles={['admin']} />}>
        <Route path="*" element={<AdminRoutes />} />  
      </Route>

      <Route path="/company/*" element={<ProtectedRoute element={<CompanyLayout />} allowedRoles={['company']} />}>
        <Route path="*" element={<CompanyRoutes />} />  
      </Route>

      <Route path="/user/*" element={<ProtectedRoute element={<UserLayout />} allowedRoles={['user']} />}>
        <Route path="*" element={<UserRoutes />} />  
      </Route>

      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


export default AppRoutes;
