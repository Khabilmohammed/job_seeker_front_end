// src/routes/CompanyRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CompanyHome from '../../Pages/Company/CompanyHome';
import CompanyStoryManagementPage from '../../Pages/Company/CompanyStoryManagementPage';
import CompanyProfile from '../../Pages/Company/CompanyProfile';
import PostDetailPage from '../../Pages/Company/PostDetailPage';
import JobPage from '../../Pages/Company/JobPage';
import JobDetailsPage from '../../Pages/Company/JobDetailsPage';
import CreateJobPage from '../../Pages/Company/CreateJobPage';
import Payment from '../../Pages/Company/Payment';
import OrderConformationPage from '../../Pages/Company/OrderConformationPage';
import GetCompanyProfiePage from '../../Componenets/Shared/GetCompanyProfiePage';
import GetUserProfilePage from '../../Componenets/Shared/GetUserProfilePage';
import ApplicantsPage from '../../Pages/Company/ApplicantsPage';
import SingleJobDetailsPage from '../../Pages/Company/SingleJobDetailsPage';
import MyNetwork from '../../Pages/Company/MyNetwork';
import MessagePage from '../../Pages/Company/MessagePage';
import SavedPage from '../../Pages/Company/SavedPost';

const CompanyRoutes = () => (
  <Routes>
    <Route
      path="/companyHome"
      element={<ProtectedRoute element={<CompanyHome />} allowedRoles={['company']} />}
    />

<Route
      path="/storyManagementpage"
      element={<ProtectedRoute element={<CompanyStoryManagementPage />} allowedRoles={['company']} />}
    />
    <Route
      path="/companyProfile"
      element={<ProtectedRoute element={<CompanyProfile />} allowedRoles={['company']} />}
    />
    <Route
      path="/postdetailpage/:postId"
      element={<ProtectedRoute element={<PostDetailPage />} allowedRoles={['company']} />}
    />

<Route
      path="/jobPage"
      element={<ProtectedRoute element={<JobPage />} allowedRoles={['company']} />}
    />

<Route
      path="/jobDetailsPage/:jobId"
      element={<ProtectedRoute element={<JobDetailsPage />} allowedRoles={['company']} />}
    />

    
<Route
      path="createJobPage"
      element={<ProtectedRoute element={<CreateJobPage />} allowedRoles={['company']} />}
    />
    <Route
      path="payment"
      element={<ProtectedRoute element={<Payment />} allowedRoles={['company']} />}
    />
    <Route
      path="orderConformationPage"
      element={<ProtectedRoute element={<OrderConformationPage />} allowedRoles={['company']} />}
    />
    <Route
      path="myNetwork"
      element={<ProtectedRoute element={<MyNetwork />} allowedRoles={['company']} />}
    />
<Route
      path="getCompanyProfiePage/:userid"
      element={<ProtectedRoute element={<GetCompanyProfiePage />} allowedRoles={['company']} />}
    />

<Route
      path="getUserProfilePage/:userid"
      element={<ProtectedRoute element={<GetUserProfilePage />} allowedRoles={['company']} />}
    />

<Route
      path="ApplicantsPage/:jobId/applicants"
      element={<ProtectedRoute element={<ApplicantsPage />} allowedRoles={['company']} />}
    />

<Route
      path="singleJobDetailsPage/:jobApplicationId"
      element={<ProtectedRoute element={<SingleJobDetailsPage />} allowedRoles={['company']} />}
    />

<Route
      path="/messagePage"
      element={<ProtectedRoute element={<MessagePage />} allowedRoles={['company']} />}
    />

<Route
      path="/savedPage"
      element={<ProtectedRoute element={<SavedPage />} allowedRoles={['company']} />}
    />

    
    {/* Add more company routes here as needed */}
  </Routes>
);

export default CompanyRoutes;
