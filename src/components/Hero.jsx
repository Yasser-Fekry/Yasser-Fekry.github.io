import React from 'react';
import '../styles/hero.css';

import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaLinux,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from 'react-icons/fa';

import {
  SiJavascript,
  SiExpress,
  SiKalilinux,
  SiBurpsuite,
  SiWireshark,
  SiOwasp,
  SiGraphql,
  SiPostman,
} from 'react-icons/si';

/* ============================================================
   Constants & Data
   ============================================================ */

const TECH_STACK = [
  // Development
  { id: 'react', title: 'React', icon: <FaReact /> },
  { id: 'javascript', title: 'JavaScript', icon: <SiJavascript /> },
  { id: 'python', title: 'Python', icon: <FaPython /> },
  { id: 'nodejs', title: 'Node.js', icon: <FaNodeJs /> },
  { id: 'express', title: 'Express', icon: <SiExpress /> },

  // Web
  { id: 'html5', title: 'HTML5', icon: <FaHtml5 /> },
  { id: 'css3', title: 'CSS3', icon: <FaCss3Alt /> },

  // Linux & OS
  { id: 'linux', title: 'Linux', icon: <FaLinux /> },
  { id: 'kalilinux', title: 'Kali Linux', icon: <SiKalilinux /> },

  // Security
  { id: 'burpsuite', title: 'Burp Suite', icon: <SiBurpsuite /> },
  { id: 'nmap', title: 'Nmap', icon: <span>NMAP</span>, isTextIcon: true },
  { id: 'wireshark', title: 'Wireshark', icon: <SiWireshark /> },
  { id: 'owasp', title: 'OWASP', icon: <SiOwasp /> },
  { id: 'graphql', title: 'GraphQL', icon: <SiGraphql /> },
  { id: 'metasploit', title: 'Metasploit', icon: <span>MSF</span>, isTextIcon: true },

  // Tools & DevOps
  { id: 'postman', title: 'Postman', icon: <SiPostman /> },
  { id: 'docker', title: 'Docker', icon: <FaDocker /> },

  // Version Control
  { id: 'git', title: 'Git', icon: <FaGitAlt /> },
  { id: 'github', title: 'GitHub', icon: <FaGithub /> },
];

/* ============================================================
   Sub-Components
   ============================================================ */

const TechItem = ({ title, icon, isTextIcon, isDuplicate }) => (
  <div
    className={`stack-item ${isTextIcon ? 'text-icon' : ''}`}
    title={!isDuplicate ? title : undefined}
  >
    {icon}
  </div>
);

const TechMarquee = () => {
  return (
    <div className="bento-card bento-tech">
      <span className="tech-label">Tech-Stack:</span>

      <div className="tech-marquee">
        <div className="tech-track">
          {/* Main Track */}
          <div className="tech-items">
            {TECH_STACK.map((item) => (
              <TechItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                isTextIcon={item.isTextIcon}
              />
            ))}
          </div>

          {/* Duplicated Track for Seamless Loop */}
          <div className="tech-items" aria-hidden="true">
            {TECH_STACK.map((item) => (
              <TechItem
                key={`dup-${item.id}`}
                icon={item.icon}
                isTextIcon={item.isTextIcon}
                isDuplicate
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   Main Hero Component
   ============================================================ */

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bento">

        {/* Main Content Card */}
        <div className="bento-card bento-main">
          <p className="code-tag">
            <span className="code-bracket">{'<span>'}</span>{' '}
            Hello, I'm <span className="hero-name">Yasser-Fekry</span>{' '}
            <span className="code-bracket">{'</span>'}</span>
          </p>

          <h1 className="hero-title">
            a <span className="highlight-green">{'{Security Researcher}'}</span> and
            <br />
            Bug Hunter <span className="blinking-cursor">|</span>
          </h1>

          <div className="code-tag-p">
            <p>
              <span className="code-bracket">{'<p>'}</span>{' '}
              <span className="hero-description">
                I specialize in{' '}
                <span className="pink-highlight">cybersecurity</span>,{' '}
                <span className="pink-highlight">ethical hacking</span>, and{' '}
                <span className="pink-highlight">penetration testing</span>. As a passionate
                content creator, I share tutorials and insights into vulnerability discovery, red
                teaming, and secure application development.
              </span>{' '}
              <span className="code-bracket">{'</p>'}</span>
            </p>
          </div>
        </div>

        {/* Profile Avatar Card */}
        <div className="bento-card bento-profile">
          <div className="profile-avatar-glow">
            <img
              src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/author.png"
              alt="Yasser Fekry"
              className="author-img"
            />
            <div className="profile-badge">
              <span>0X01</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee Card */}
        <TechMarquee />

      </div>
    </section>
  );
};

export default Hero;
