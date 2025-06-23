import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useUserRole } from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const role = useUserRole();

    if (!user) return <Navigate to="/login" />;
    if (role !== "admin") return <Navigate to="/" />;

    return children;
};

export default AdminRoute;
