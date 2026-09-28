import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import "../styles/navbar.css";

const NAV_LINKS = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/blog", label: "blog" },
  { to: "/resume", label: "resume" },
  { to: "/contact", label: "contact" },
];

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Apply + save the theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar")) closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <button
        type="button"
        className="nav-toggle"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div id="nav-menu" className={`nav-links ${isOpen ? "open" : ""}`}>
        <div className="nav-links-inner">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
