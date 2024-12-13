import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Storage/Redux/UserAuthSlice'; // Import your logout action
import { isTokenExpired } from '../Taghelper/isTokenExpired'; // Import the utility function

 const useSessionTimeout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (isTokenExpired(token)) {
      dispatch(logoutUser()); // Clear Redux state
      localStorage.removeItem('token');
      localStorage.removeItem('UserRole'); // Remove token from localStorage
      navigate('/'); // Redirect to login page
    }
  }, [dispatch, navigate]);
};

export default useSessionTimeout;
