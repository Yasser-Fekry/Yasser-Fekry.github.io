import { GithubIcon, Linkedin, Mail } from "lucide-react";

function Contact() {
  return (
    <section className="container section">
      <h2>Contact</h2>

      <p>
        Interested in security research, collaboration, or a project? Reach
        out below.
      </p>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <a
          href="mailto:your@email.com"
          className="btn"
          style={{ width: "fit-content" }}
        >
          <Mail size={16} /> your@email.com
        </a>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 8,
          }}
        >
          <a
            href="https://github.com/Yasser-Fekry"
            target="_blank"
            rel="noreferrer"
            className="tag"
          >
            <GithubIcon size={14} /> GitHub
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="tag"
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
