import { createContext, useContext, useEffect, useState } from "react";
import {
  httpRegisterUser,
  httpLoginUser,
  httpGetUser,
  httpLogoutUser,
} from "../hooks/requests";

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // State to manage current user information
  const [currentUser, setCurrentUser] = useState();
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to indicate loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user information from the server
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await httpGetUser();

      // If user information is available, set current user and update authentication status
      if (response.user) {
        setCurrentUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Register a new user
  const registerUser = async (user) => {
    try {
      const response = await httpRegisterUser(user);
      return response;
    } catch (err) {
      console.error("Registration failed. Invalid user.", err);
    }
  };

  // Log in an existing user
  const loginUser = async (user) => {
    try {
      const res = await httpLoginUser(user);

      // If login is successful, update current user and authentication status
      if (res.ok) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        await fetchUser();
        console.log(res.message)
        return { ok: true, message: res.message };
      } else {
        return { ok: false, message: res.message };
      }


    } catch (err) {
      return { ok: false, error: err };
    }
  };

  // Log out the current user
  const logoutUser = async () => {
    try {
      await httpLogoutUser();
      // Additional cleanup or handling after logout if needed
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
