import { Youtube, Linkedin, Github } from "lucide-react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import "../styles/footer.css";

const SOCIALS = [
  { href: "https://www.youtube.com/@Dev_YasserFekry", label: "YouTube", Icon: Youtube },
  { href: "https://www.linkedin.com/in/yasser-fekry/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://twitter.com/Dev_YasserFekry", label: "X (Twitter)", Icon: FaXTwitter },
  { href: "https://t.me/Dev_YasserFekry", label: "Telegram", Icon: FaTelegram },
  { href: "https://github.com/Yasser-Fekry/", label: "GitHub", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Socials */}
        <ul className="footer-socials">
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                className="footer-social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="footer-copy">&copy; 2026 Yasser Fekry</p>
      </div>
    </footer>
  );
}
