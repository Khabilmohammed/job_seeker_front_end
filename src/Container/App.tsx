import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/UserAuthSlice';
import AppRoutes from './routes/AppRoutes';
import signalrService from '../Apis/signalrConnection/signalrService';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    signalrService.startConnection();
    return () => {
      signalrService.stopConnection();
    };
  }, []);
  useEffect(()=>{
    const localtoken=localStorage.getItem("token");
    if (localtoken) {
      const decodedToken = jwtDecode<{
        nameid: string;
        unique_name: string; 
        email: string;
        role: string;
        firstName: string;
        lastName: string;
        city: string;
        country: string;
        pincode: string; 
      }>(localtoken);
      dispatch(setLoggedInUser({
        id: decodedToken.nameid,
        username: decodedToken.unique_name,
        email: decodedToken.email,
        role: decodedToken.role,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        city: decodedToken.city,
        country: decodedToken.country,
        pincode: decodedToken.pincode,
      }));
    }
  }, [dispatch]);
  return <AppRoutes />;
}

export default App;
