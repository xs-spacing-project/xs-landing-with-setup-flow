import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SetupParkingPage from "./pages/SetupParkingPage";
import {
  PrivacyPolicyPage,
  TermsOfServicePage,
  ContactPage,
} from "./pages/StaticPages";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Use timeout to ensure the element is available in the DOM after page transition
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isLandingPage = location.pathname === "/";
  const isSetupPage = location.pathname === "/setup-parking";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex flex-col min-h-screen font-sans">
        {!isSetupPage && <Header isLandingPage={isLandingPage} />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup-parking" element={<SetupParkingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;