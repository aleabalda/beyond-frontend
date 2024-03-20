import "../assets/App.css";
import lightLogo from "../assets/images/BEYOND Light Mode.png";
import darkLogo from "../assets/images/BEYOND Dark Mode.png";
import LightModeIcon from "@mui/icons-material/LightMode"; // Material UI icon for light mode
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Material UI icon for dark mode
import React, { useState, createContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import StartPage from "../pages/StartPage/StartPage";

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Defines the structure of the context object for theme management, including the current theme and a method to toggle the theme.
type ThemeContextType = {
  theme: string; // The current theme ('light' or 'dark').
  toggleTheme: () => void; // Function to toggle the application's theme.
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
function Layout() {
  const [theme, setTheme] = useState("dark");
  const { isLoggedIn } = useAuth();
  const nav = useNavigate();

  // Toggles the current theme between 'light' and 'dark' modes and updates the application state accordingly.
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const path = event.currentTarget.getAttribute("data-path");
    if (path) {
      nav(path);
    }
  };

  const [name, setName] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");

  const getInfo = () => {
    setName(localStorage.getItem("Name") || "");
    setPfp(localStorage.getItem("PFP") || "");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <StartPage />
      ) : (
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
              <Navbar />
              <div className="button-group">
                <div id="profile">
                  <button
                    className="profile-button"
                    onClick={() => {
                      nav("/profile");
                    }}
                  >
                    <img id="profile-pic" src={pfp} alt="PFP"></img>
                    <div className="profile-text">
                      <p id="profile-username">{name}</p>
                      <p id="profile-small">Profile</p>
                    </div>
                  </button>
                </div>
                <button className="mode-button" onClick={toggleTheme}>
                  {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </button>
              </div>
            </div>
            <main>
              <Outlet />
            </main>
            <footer>
              <img id="footer-logo" src={darkLogo} alt="logo" />
              <p id="copyright-logo">&#169;</p>
              <div className="footer-features">
                Discover
                <p className="feature" onClick={handleClick} data-path="/">
                  Home
                </p>
                <p
                  className="feature"
                  onClick={handleClick}
                  data-path="/sky-objects"
                >
                  Sky Objects
                </p>
                <p
                  className="feature"
                  onClick={handleClick}
                  data-path="/sky-map"
                >
                  Sky Map
                </p>
                <p
                  className="feature"
                  onClick={handleClick}
                  data-path="/favourites"
                >
                  Favourites
                </p>
              </div>
              <div className="footer-features">
                Contact
                <p className="feature">About</p>
                <p className="feature">Contact Us</p>
              </div>
            </footer>
          </div>
        </ThemeContext.Provider>
      )}
    </>
  );
}

export default Layout;
