import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { HiMenuAlt2, HiX } from "react-icons/hi";

import { AuthProvider, useAuth } from "./auth/useAuth";
import UserMenu from "./components/UserMenu";
import AppRoutes from "./routes/AppRoutes";
import { useUserRole } from "./hooks/useUserRole";

import { HelmetProvider } from "react-helmet-async";

import { ThemeProvider } from "./context/ThemeContext";

import "./styles/App.css";
import './styles/theme.css';


function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();
    const role = useUserRole();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="app-layout">
            <header className="topbar">
                <div className="topbar-content">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        {sidebarOpen ? <HiX /> : <HiMenuAlt2 />}
                    </button>
                    <div style={{ marginLeft: "auto" }}>
                        <UserMenu user={user} />
                    </div>
                </div>
            </header>

            <div className="content-wrapper">
                {sidebarOpen && (
                    <aside className="sidebar">
                        <nav className="nav-links">
                            <Link to="/">Dashboard</Link>
                            <Link to="/characters">Characters</Link>
                            <Link to="/npcs">NPCs</Link>
                            <Link to="/quests">Quests</Link>
                            <Link to="/locations">Locations</Link>
                            <Link to="/events">Events</Link>
                            <Link to="/items">Items</Link>
                            <Link to="/canvas">Story Canvas</Link>
                            {role === "admin" && <Link to="/admin">Admin</Link>}
                        </nav>
                    </aside>
                )}

                <main className="main-content">
                    <AppRoutes />
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Router basename="/campaign-manager">
                        <Layout />
                    </Router>
                </ThemeProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
