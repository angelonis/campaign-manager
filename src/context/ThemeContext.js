import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const initialTheme = stored === "light" || stored === "dark" ? stored : "dark";
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);


    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        console.log("Toggling theme to", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
