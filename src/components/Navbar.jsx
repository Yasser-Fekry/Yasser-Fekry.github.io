import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlignLeft, X, Sun, Moon, Youtube, Linkedin, Github } from "lucide-react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import "../styles/navbar.css";

const BRAND = "";

// Shown in the center of the bar on desktop
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/videos", label: "Videos" },
  { to: "/contact", label: "Contact" },
];

// Only inside the menu panel (edit / remove as you like)
const EXTRA_LINKS = [
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

// TODO: replace the "#" with your real profile URLs
const SOCIALS = [
  { href: "https://www.youtube.com/@Dev_YasserFekry", label: "YouTube", Icon: Youtube },
  { href: "https://www.linkedin.com/in/yasser-fekry/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://twitter.com/Dev_YasserFekry", label: "X (Twitter)", Icon: FaXTwitter },
  { href: "https://t.me/Dev_YasserFekry", label: "Telegram", Icon: FaTelegram },
  { href: "https://github.com/Yasser-Fekry/", label: "GitHub", Icon: Github },
];

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
};

function SocialLinks({ className = "" }) {
  return (
    <div className={`nav-socials ${className}`}>
      {SOCIALS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          className="nav-social"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon size={17} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

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

  // Close the menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close on Escape / click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-wrap")) closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const renderLink = ({ to, label }, extraClass = "") => {
    const isActive = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        className={`${extraClass} ${isActive ? "active" : ""}`.trim()}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="navbar-wrap">
      <nav className="navbar" aria-label="Main navigation">
        {/* Left: menu toggle */}
        <button
          type="button"
          className="nav-panel-btn nav-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <AlignLeft size={20} aria-hidden="true" />}
        </button>

        {/* Brand */}
        <Link to="/" className="nav-brand">
          {BRAND}
        </Link>

        {/* Center links (desktop) */}
        <div className="nav-center">{NAV_LINKS.map((l) => renderLink(l))}</div>

        {/* Socials (desktop) */}
        <SocialLinks className="nav-socials-bar" />

        {/* Right: theme toggle */}
        <button
          type="button"
          className="nav-panel-btn theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
      </nav>

      {/* Dropdown menu panel */}
      <div id="nav-menu" className={`nav-menu ${isOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => renderLink(l, "only-mobile"))}
        {EXTRA_LINKS.map((l) => renderLink(l))}
        <SocialLinks className="nav-socials-menu" />
      </div>
    </header>
  );
}
