import "../assets/App.css";
import lightLogo from "../assets/images/BEYOND Light Mode.png";
import darkLogo from "../assets/images/BEYOND Dark Mode.png";
import LightModeIcon from "@mui/icons-material/LightMode"; // Material UI icon for light mode
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Material UI icon for dark mode
import React, { useState, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Defines the structure of the context object for theme management, including the current theme and a method to toggle the theme.
type ThemeContextType = {
  theme: string; // The current theme ('light' or 'dark').
  toggleTheme: () => void; // Function to toggle the application's theme.
};

// Props for the Layout component, specifying the types of children it can receive.
type LayoutProps = {
  children: ReactNode; // Child components to render within the layout.
};

/**
 * Layout Component
 *
 * This component acts as the main layout wrapper for the application, providing a consistent structure
 * that includes a header with theme toggling, navigation bar, and a content area for child components.
 *
 * Props:
 * - children: ReactNode - The content to be displayed within the main content area of the layout.
 *
 * State:
 * - theme: string - Tracks the current theme ('light' or 'dark') and adjusts the application's appearance accordingly.
 *
 * Functions:
 * - toggleTheme: () => void - Toggles the theme between 'light' and 'dark' modes.
 */
function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState("dark");

  const nav = useNavigate();

  // Toggles the current theme between 'light' and 'dark' modes and updates the application state accordingly.
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className="app">
        <div id="header">
          <img
            id="logo"
            src={theme === "light" ? lightLogo : darkLogo}
            alt="logo"
            onClick={() => {
              nav("/");
            }}
          ></img>
          <div id="theme-switch">
            <button className="mode-button" onClick={toggleTheme}>
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
          </div>
        </div>
        <div className="main">
          <Navbar />
          <main id="content">{children}</main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Layout;
