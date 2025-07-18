import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import "../styles/Login.css";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCreds = await signInWithEmailAndPassword(auth, email, password);
            if (!userCreds.user.emailVerified) {
                setError("Please verify your email before logging in. Check your inbox for the verification link.");
                return;
            }
            navigate("/");
        } catch (err) {
            setError("An account with that username/password does not exist. Please use the 'Register here' link below to create an account.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Login | Campaign Manager</title>
                <meta name="description" content="Login to your account." />
            </Helmet>

            <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="login-actions">
                    <button type="submit" className="login-button">Login</button>
                    <Link to="/reset-password" className="forgot-link">Forgot Password?</Link>
                </div>

                <p className="register-message">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
            </div>
        </>

    );
}

export default LoginPage;
