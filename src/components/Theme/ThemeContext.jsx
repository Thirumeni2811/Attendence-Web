import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get stored theme or use system preference
  const getStoredMode = () => {
    const storedTheme = localStorage.getItem("toolpad-mode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return storedTheme || (prefersDark ? "dark" : "light");
  };

  const [mode, setMode] = useState(getStoredMode);

  // Listen for storage changes (useful if multiple tabs are open)
  useEffect(() => {
    const handleStorageChange = () => {
      setMode(getStoredMode());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update localStorage and apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("toolpad-mode", mode);
  }, [mode]);

  // Toggle mode function
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
