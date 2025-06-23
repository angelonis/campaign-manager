import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const WelcomePage = () => {
    return (
        <>
            <Helmet>
                <title>Welcome | Campaign Manager</title>
            </Helmet>

            <div className="welcome-page">
                <h1>Welcome to Campaign Manager</h1>
                <p>Build immersive lore, manage NPCs, and shape your world.</p>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
            </div>
        </>
    );
};

export default WelcomePage;
