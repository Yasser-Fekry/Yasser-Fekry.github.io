import { useState } from "react";
import { Youtube, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import "../styles/contact.css";

// TODO: put your real email here
const EMAIL = "your@email.com";

const CONTACTS = [
  { label: "YouTube", value: "@Dev_YasserFekry", href: "https://www.youtube.com/@Dev_YasserFekry", Icon: Youtube },
  { label: "LinkedIn", value: "@yasser-fekry", href: "https://www.linkedin.com/in/yasser-fekry/", Icon: Linkedin },
  { label: "X (Twitter)", value: "@Dev_YasserFekry", href: "https://twitter.com/Dev_YasserFekry", Icon: FaXTwitter },
  { label: "Telegram", value: "@Dev_YasserFekry", href: "https://t.me/Dev_YasserFekry", Icon: FaTelegram },
  { label: "GitHub", value: "@Yasser-Fekry", href: "https://github.com/Yasser-Fekry/", Icon: Github },
//   { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
];

const EMPTY = { name: "", email: "", subject: "", message: "", agree: false };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setSent(false);
  };

  // No backend: opens the visitor's mail app with the message filled in.
  // To send without a mail app, post `form` to Formspree / EmailJS here instead.
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bento">
        <div className="bento-card contact-card">
          <header className="contact-header">
            <h1 className="contact-title">Contact</h1>
          </header>

          <div className="contact-body">
            {/* ---------- Form ---------- */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-subtitle">Let's connect</h2>

              <div className="contact-row">
                <label className="contact-field">
                  <span className="contact-label">
                    Name <i>*</i>
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-label">
                    Email <i>*</i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-label">
                  Subject <i>*</i>
                </span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  placeholder="Subject"
                  required
                />
              </label>

              <label className="contact-field">
                <span className="contact-label">
                  Message <i>*</i>
                </span>
                <textarea
                  name="message"
                  rows={8}
                  value={form.message}
                  onChange={update}
                  placeholder="Your Message"
                  required
                />
              </label>

              <label className="contact-check">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={update}
                  required
                />
                <span className="contact-check__box" />
                <span className="contact-label">
                  I agree to the Terms and Privacy Policy <i>*</i>
                </span>
              </label>

              <div className="contact-actions">
                <button type="submit" className="contact-submit">
                  Send Message <ArrowUpRight size={14} />
                </button>
                {sent && (
                  <p className="contact-status" role="status">
                    Your mail app should open with the message ready to send.
                  </p>
                )}
              </div>
            </form>

            {/* ---------- Links ---------- */}
            <ul className="contact-links">
              {CONTACTS.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    className="contact-link"
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <span className="contact-link__icon">
                      <Icon size={20} />
                    </span>
                    <span className="contact-link__text">
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
