import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NPCPage from "./pages/NPCPage";
import QuestPage from "./pages/QuestPage";

function App() {
    return (
        <Router>
            <nav style={{ padding: "1rem", backgroundColor: "#222", color: "#fff" }}>
                <Link to="/" style={{ marginRight: 10, color: "#fff" }}>Home</Link>
                <Link to="/npcs" style={{ marginRight: 10, color: "#fff" }}>NPCs</Link>
                <Link to="/quests" style={{ color: "#fff" }}>Quests</Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/npcs" element={<NPCPage />} />
                <Route path="/quests" element={<QuestPage />} />
            </Routes>
        </Router>
    );
}

export default App;