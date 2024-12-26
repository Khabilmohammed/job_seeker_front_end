import { useSelector } from 'react-redux';
import { Rootstate } from '../Storage/Redux/store'; 
import { jwtDecode } from 'jwt-decode';
import { useRefreshTokenMutation } from '../Apis/authApi';

const useAuth = () => {
  const user = useSelector((state: Rootstate) => state.userAuthStore);
  const [refreshTokenApiCall] = useRefreshTokenMutation();
  const localToken = localStorage.getItem('token');
  let isAuthenticated = Boolean(user.id);


  const getRefreshTokenFromCookie = (): string | null => {
    const cookies = document.cookie.split("; ");
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken=")
    );
    return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
  };
  const handleTokenRefresh = async () => {
    const refreshToken = getRefreshTokenFromCookie();
    if (!refreshToken) {
      localStorage.removeItem("token");
      return false;
    }

    try {
      const response = await refreshTokenApiCall(refreshToken).unwrap();
      const { token } = response.data;
      localStorage.setItem("token", token);
      
      return true;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  if (!isAuthenticated && localToken) {
    try {
      const decodedToken: any = jwtDecode(localToken);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
      } else {
        handleTokenRefresh().then((success:any) => {
          isAuthenticated = success;
        });  
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
