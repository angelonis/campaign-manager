import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../auth/useAuth";
import { doc, setDoc } from "firebase/firestore";

import { Helmet } from "react-helmet-async";

const VerifyEmailPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resent, setResent] = useState(false);

    useEffect(() => {
        if (!user) return;

        const interval = setInterval(async () => {
            await user.reload(); // Refresh user object
            if (user.emailVerified) {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    displayName: auth.currentUser.email,
                    email: auth.currentUser.email,
                    role: "viewer",
                    joined: new Date().toISOString(),
                });

                clearInterval(interval);
                navigate("/dashboard");
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [user, navigate]);

    const handleResend = async () => {
        try {
            if (user && !user.emailVerified) {
                await sendEmailVerification(user);
                setResent(true);
            }
        } catch (err) {
            console.error("Error resending verification:", err);
        }
    };

    return (
        <>
            <Helmet>
                <title>Verify Email | Campaign Manager</title>
            </Helmet>

            <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Verify Your Email</h2>
            <p>We've sent a verification link to <strong>{user?.email}</strong>.</p>
            <p>Please click the link in your email to continue.</p>

            <button onClick={handleResend} style={{ marginTop: "1rem" }}>
                Resend Email
            </button>

            {resent && <p style={{ color: "green" }}>Verification email resent!</p>}
            </div>

        </>
    );
};

export default VerifyEmailPage;
