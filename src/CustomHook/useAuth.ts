import { useSelector } from 'react-redux';
import { Rootstate } from '../Storage/Redux/store'; 
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const user = useSelector((state: Rootstate) => state.userAuthStore);
  
  const localToken = localStorage.getItem('token');
  let isAuthenticated = Boolean(user.id);

  if (!isAuthenticated && localToken) {
    try {
      const decodedToken: any = jwtDecode(localToken);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
      } else {
        localStorage.removeItem('token');  
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem('token');  // Remove token if invalid
    }
  }

  return {
    isAuthenticated,
    user,
  };
};
export default useAuth;
