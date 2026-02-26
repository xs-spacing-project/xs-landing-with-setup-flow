import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SetupParkingPage from "./pages/SetupParkingPage";
import {
  PrivacyPolicyPage,
  PrivacyPolicyDetailedPage,
  TermsOfServicePage,
  TermsOfUsePage,
  ContactPage,
  DeleteAccountPage,
  RefundAndCancellationPolicyPage,
} from "./pages/StaticPages";
import DownloadPage from "./pages/DownloadPage";

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
  const navigate = useNavigate();

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
    // Support legacy hash-based URLs like `#/download`.
    if (location.hash.startsWith("#/")) {
      navigate(location.hash.slice(1), { replace: true });
    }
  }, [location.hash, navigate]);

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
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/setup-parking" element={<SetupParkingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy-detailed" element={<PrivacyPolicyDetailedPage />} />
            <Route path="/refund-and-cancellation-policy" element={<RefundAndCancellationPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
