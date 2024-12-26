import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Home } from '../../Pages';
import StoryManagementPage from '../../Pages/User/StoryManagementPage';
import UserProfile from '../../Pages/User/UserProfile';
import PostDetailPage from '../../Pages/User/PostDetailPage';
import SavedPage from '../../Pages/User/SavedPage';
import JobListingsPage from '../../Pages/User/JobListingsPage';
import JobDetailPage from '../../Pages/User/JobDetailPage';
import GetUserProfilePage from '../../Componenets/Shared/GetUserProfilePage';
import GetCompanyProfiePage from '../../Componenets/Shared/GetCompanyProfiePage';
import JobApplicationPage from '../../Pages/User/JobApplicationPage';
import AppliedJobsPage from '../../Pages/User/AppliedJobsPage';
import SingleJobDetailsPage from '../../Pages/User/SingleJobDetailsPage';
import NotificationPage from '../../Pages/User/NotificationPage';
import MyNetwork from '../../Pages/User/MyNetwork';
import MessagePage from '../../Pages/User/MessagePage';

const UserRoutes = () => (
<Routes>
    <Route
      path="/home"
      element={<ProtectedRoute element={<Home />} allowedRoles={['user']} />}
    />
     <Route
      path="/storyManagementpage"
      element={<ProtectedRoute element={<StoryManagementPage />} allowedRoles={['user']} />}
    />

<Route
      path="/userProfile"
      element={<ProtectedRoute element={<UserProfile />} allowedRoles={['user']} />}
    />
<Route
      path="/postdetailpage/:postId"
      element={<ProtectedRoute element={<PostDetailPage />} allowedRoles={['user']} />}
    />

<Route
      path="/savedPage"
      element={<ProtectedRoute element={<SavedPage />} allowedRoles={['user']} />}
    />


<Route
      path="/jobListingsPage"
      element={<ProtectedRoute element={<JobListingsPage />} allowedRoles={['user']} />}
    />

<Route
      path="/notificationPage"
      element={<ProtectedRoute element={<NotificationPage />} allowedRoles={['user']} />}
    />

<Route
      path="/jobDetailPage/:jobId"
      element={<ProtectedRoute element={<JobDetailPage />} allowedRoles={['user']} />}
    />

<Route
      path="getUserProfilePage/:userid"
      element={<ProtectedRoute element={<GetUserProfilePage />} allowedRoles={['user']} />}
    />


<Route
      path="getCompanyProfiePage/:userid"
      element={<ProtectedRoute element={<GetCompanyProfiePage />} allowedRoles={['user']} />}
    />

<Route
      path="jobApplicationPage/:jobId"
      element={<ProtectedRoute element={<JobApplicationPage />} allowedRoles={['user']} />}
    />

<Route
      path="/appliedJobsPage"
      element={<ProtectedRoute element={<AppliedJobsPage />} allowedRoles={['user']} />}
    />
<Route
      path="singleJobDetailsPage/:jobApplicationId"
      element={<ProtectedRoute element={<SingleJobDetailsPage />} allowedRoles={['user']} />}
    />

<Route
      path="/myNetwork"
      element={<ProtectedRoute element={<MyNetwork />} allowedRoles={['user']} />}
    />

<Route
      path="/messagePage"
      element={<ProtectedRoute element={<MessagePage />} allowedRoles={['user']} />}
    />


  </Routes>
);

export default UserRoutes;
