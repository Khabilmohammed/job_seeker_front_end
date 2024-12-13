import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // Expiration time
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // If no token, consider it expired

  try {
    const decodedToken = jwtDecode<TokenPayload>(token); 
    const currentTime = Date.now() / 1000; 

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return true; 
  }
};
