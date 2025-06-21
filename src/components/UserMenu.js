import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useTheme } from "../context/ThemeContext";
import { HiCog, HiUser, HiLogout, HiSun, HiMoon } from "react-icons/hi";

import "../styles/UserMenu.css";

const UserMenu = ({ user }) => {
    const [open, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleProfileClick = () => {
        if (user) {
            setMenuOpen(!open)
        } 
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    return (
        <div className="user-menu" ref={menuRef}>
            <div className="user-icon-container" onClick={() => handleProfileClick()}>
                {user?.email
                    ? <div className="user-icon">{user.email.charAt(0).toUpperCase()}</div>
                    : <button onClick={handleLoginClick}>Login</button>}
            </div>
            {open && (
                <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                    }}>
                        <HiUser /> Profile
                    </div>
                    <div className="menu-item" onClick={() => {
                        navigate("/settings");
                        setMenuOpen(false);
                    }}>
                        <HiCog /> Settings
                    </div>
                    <div className="menu-item" onClick={toggleTheme}>
                        {theme === "dark" ? <HiSun /> : <HiMoon />} {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </div>
                    <div className="menu-item" onClick={() => {
                        handleLogout();

                    }}>
                        <HiLogout /> Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
