import { Navigate, Outlet, } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useEffect, useState } from "react";
import { httpGetUser } from "../../hooks/requests";

const RequireAuth = () => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated
        ? <Outlet />
        : <Navigate to="/authentication"></Navigate>
    )
  };
  export default RequireAuth;