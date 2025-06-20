import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { HiMenuAlt2, HiX } from "react-icons/hi";

import HomePage from "./pages/HomePage";
import NPCPage from "./pages/NPCPage";
import QuestPage from "./pages/QuestPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import UserMenu from "./components/UserMenu";


import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <div className="app-layout">
                <header className="topbar">
                    <div className="topbar-content">
                        <button className="sidebar-toggle" onClick={toggleSidebar}>
                            {sidebarOpen ? <HiX /> : <HiMenuAlt2 />}
                        </button>
                        <div style={{ marginLeft: "auto" }}>
                            <UserMenu />
                        </div>
                    </div>
                </header>

                <div className="content-wrapper">
                    {sidebarOpen && (
                        <aside className="sidebar">
                            <nav className="nav-links">
                                <Link to="/">Home</Link>                                
                                <Link to="/npcs">NPCs</Link>
                                <Link to="/quests">Quests</Link>
                            </nav>
                        </aside>
                    )}

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/npcs" element={<NPCPage />} />
                            <Route path="/quests" element={<QuestPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
