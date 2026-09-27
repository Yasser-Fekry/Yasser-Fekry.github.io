import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="terminal-dot" />
            <span className="terminal-dot" />
            <span className="terminal-dot accent" />
          </div>

          <div className="terminal-body">
            <p className="terminal-line">
            </p>
            <h1 className="hero-name">Yasser Fekry</h1>
            <p className="hero-role">
              Web Application Security Researcher — finding, understanding,
              and reporting vulnerabilities.
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">
              Read my research <ArrowRight size={16} />
            </Link>
            <Link to="/resume" className="btn">
              View resume <FileText size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
