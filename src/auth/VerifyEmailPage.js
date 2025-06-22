import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebase";

function VerifyEmailPage() {
    const [user] = useAuthState(auth);

    const resendVerification = async () => {
        try {
            if (user && !user.emailVerified) {
                await sendEmailVerification(user);
                alert("Verification email resent.");
            }
        } catch (error) {
            console.error("Error sending verification email:", error);
            alert("Failed to resend verification email.");
        }
    };

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Verify Your Email</h2>
            <p>
                A verification email has been sent to <strong>{user?.email}</strong>.
            </p>
            <p>
                Please check your inbox and click the verification link to activate your account.
            </p>

            <button onClick={resendVerification} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                Resend Verification Email
            </button>
        </div>
    );
}

export default VerifyEmailPage;
