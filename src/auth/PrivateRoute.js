import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    if (!user.emailVerified) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};

export default PrivateRoute;
