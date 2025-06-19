import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NPCPage from "./pages/NPCPage";
import QuestPage from "./pages/QuestPage";

import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Router>
            <div className="app-layout">
                <header className="topbar">
                    <div className="topbar-content">
                        <button className="sidebar-toggle" onClick={toggleSidebar}>
                            {sidebarOpen ? "☰ Hide" : "☰ Show"}
                        </button>
                        <span>User: DM</span>
                    </div>
                </header>

                <div className="content-wrapper">
                    {sidebarOpen && (
                        <aside className="sidebar">
                            <h2>Navigation</h2>
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
                            <Route path="/npcs" element={<NPCPage />} />
                            <Route path="/quests" element={<QuestPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
