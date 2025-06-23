import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import "../styles/ResetPassword.css";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Check your inbox for a password reset email.");
        } catch (err) {
            console.error(err);
            setError("Failed to send reset email. Please check the address.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | Campaign Manager</title>
            </Helmet>

            <div className="reset-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleReset} className="reset-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="reset-input"
                />
                <button type="submit" className="reset-button">Send Reset Email</button>                
            </form>

            {message && <p className="reset-message success">{message}</p>}
            {error && <p className="reset-message error">{error}</p>}

            <div className="reset-links">
                <p>
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>

        </div>
        </>
    );
};

export default ResetPasswordPage;
