import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useUserModel } from "../hooks/useUserModel";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import "../styles/ProfilePage.css";

function ProfilePage() {
    const { userModel } = useUserModel();
    const user = auth.currentUser;

    const [formData, setFormData] = useState({
        email: "",
        displayName: "",
        firstName: "",
        lastName: ""
    });

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (userModel) {
            setFormData({
                email: user.email || "",
                displayName: user.displayName || userModel.displayName || "",
                firstName: userModel.firstName || "",
                lastName: userModel.lastName || ""
            });
        }
    }, [userModel, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Saving...");

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                displayName: formData.displayName,
                firstName: formData.firstName,
                lastName: formData.lastName
            });

            setStatus("Profile updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
            setStatus("Failed to update profile.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Profile | Campaign Manager</title>
                <meta name="description" content="Manage your profile" />
            </Helmet>

            <div className="profile-container">
                <h2>User Profile</h2>
                <form onSubmit={handleSubmit} className="profile-form">
                    <label>Email (read-only)</label>
                    <input type="email" value={formData.email} disabled />

                    <label>Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        required
                    />

                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <button type="submit">Save Changes</button>
                    {status && <p className="status-msg">{status}</p>}
                </form>
            </div>
        </>
    );
}

export default ProfilePage;

