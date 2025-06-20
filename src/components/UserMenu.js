import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

function UserMenu() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setMenuOpen(false);
        navigate("/login");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuRef = useRef(null);
    return (  
        <div ref={menuRef} style={{ position: "relative", marginRight: "1rem" }}>
            {user ? (
                <div>
                    <div
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontWeight: "bold",
                            userSelect: "none"
                        }}
                        title={user.email}
                    >
                        {user.email.charAt(0).toUpperCase()}
                    </div>
                    {menuOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50px",
                                right: 0,
                                background: "white",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                padding: "0.5rem 0",
                                zIndex: 10,
                                minWidth: "160px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                            }}
                        >
                            <div style={{ padding: "0.5rem 1rem 0.2rem", fontWeight: "bold", fontSize: "0.70rem", color: "#555", opacity:.5 }}>
                                {user.email}
                            </div>

                            <div
                                className="dropdown-item"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/profile");
                                }}
                            >
                                <FaUser style={{ marginRight: "8px" }} />
                                Profile
                            </div>

                            <div
                                className="dropdown-item"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/settings");
                                }}
                            >
                                <FaCog style={{ marginRight: "8px" }} />
                                Settings
                            </div>

                            <div
                                className="dropdown-item"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt style={{ marginRight: "8px" }} />
                                Logout
                            </div>
                        </div>
                    )}


                </div>
            ) : (
                <button onClick={handleLoginClick}>Login</button>
            )}
        </div>
    );
}

export default UserMenu;
