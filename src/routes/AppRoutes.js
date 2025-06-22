import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import VerifyEmailPage from "../auth/VerifyEmailPage";
import PrivateRoute from "../auth/PrivateRoute";
import ResetPasswordPage from "../auth/ResetPasswordPage";

import Dashboard from "../dashboard/Dashboard";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import WelcomePage from "../pages/WelcomePage";

import CharacterPage from "../entities/CharacterPage";
import NPCPage from "../entities/NPCPage";
import QuestPage from "../entities/QuestPage";
import LocationPage from "../entities/LocationPage";
import EventPage from "../entities/EventPage";
import ItemPage from "../entities/ItemPage";
import EntityDetail from "../entities/EntityDetail";
import CanvasPage from "../story-canvas/CanvasPage";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={user ? <Dashboard /> : <WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

            <Route path="/characters" element={<PrivateRoute><CharacterPage /></PrivateRoute>} />
            <Route path="/npcs" element={<PrivateRoute><NPCPage /></PrivateRoute>} />
            <Route path="/quests" element={<PrivateRoute><QuestPage /></PrivateRoute>} />
            <Route path="/locations" element={<PrivateRoute><LocationPage /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventPage /></PrivateRoute>} />
            <Route path="/items" element={<PrivateRoute><ItemPage /></PrivateRoute>} />
            <Route path="/entity/:type/:id" element={<PrivateRoute><EntityDetail /></PrivateRoute>} />
            <Route path="/canvas" element={<PrivateRoute><CanvasPage /></PrivateRoute>} />            
        </Routes>
    );
};

export default AppRoutes;
