import React, { useState } from 'react';
import '../styles/hero.css';

import { Quote } from 'lucide-react';
import profilePhoto from '../assets/images/profile/photo.jpg';

import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaLinux,
  FaGitAlt,
  FaGithub,
  FaTerminal,
  FaGraduationCap,
} from 'react-icons/fa';

import {
  SiJavascript,
  SiKalilinux,
  SiArchlinux,
  SiBurpsuite,
  SiOwasp,
  SiHackerone,
  SiBugcrowd,
} from 'react-icons/si';

/* ============================================================
   Static Data
   ============================================================ */

const HERO_QUOTES = [
  'Think Like the Attacker',
  'The Bug in SomeWhere',
];

const TECH_STACK = [
  // Computer Science & Tech Foundations
  { id: 'cs', title: 'Computer Science', icon: <FaGraduationCap /> },

  // Security & Recon Tools
  { id: 'burpsuite', title: 'Burp Suite', icon: <SiBurpsuite /> },
  {
    id: 'caido',
    title: 'Caido',
    icon: <span>CAIDO</span>,
    isTextIcon: true,
  },
  {
    id: 'nmap',
    title: 'Nmap',
    icon: <span>NMAP</span>,
    isTextIcon: true,
  },
  {
    id: 'ffuf',
    title: 'FFUF',
    icon: <span>FFUF</span>,
    isTextIcon: true,
  },
  {
    id: 'owasp',
    title: 'OWASP Top 10',
    icon: <SiOwasp />,
  },

  // Operating Systems
  { id: 'archlinux', title: 'Arch Linux', icon: <SiArchlinux /> },
  { id: 'kalilinux', title: 'Kali Linux', icon: <SiKalilinux /> },
  { id: 'linux', title: 'Linux', icon: <FaLinux /> },

  // Languages & Scripting
  { id: 'python', title: 'Python', icon: <FaPython /> },
  { id: 'bash', title: 'Bash / Shell', icon: <FaTerminal /> },
  { id: 'javascript', title: 'JavaScript', icon: <SiJavascript /> },

  // Frameworks & Development
  { id: 'react', title: 'React', icon: <FaReact /> },
  { id: 'nodejs', title: 'Node.js', icon: <FaNodeJs /> },

  // Platforms & Version Control
  { id: 'hackerone', title: 'HackerOne', icon: <SiHackerone /> },
  { id: 'bugcrowd', title: 'Bugcrowd', icon: <SiBugcrowd /> },
  { id: 'git', title: 'Git', icon: <FaGitAlt /> },
  { id: 'github', title: 'GitHub', icon: <FaGithub /> },
];

/* ============================================================
   Tech Stack Item
   ============================================================ */

const TechItem = ({
  title,
  icon,
  isTextIcon,
  isDuplicate,
}) => (
  <div
    className={`stack-item ${isTextIcon ? 'text-icon' : ''}`}
    title={!isDuplicate ? title : undefined}
  >
    {icon}
  </div>
);

/* ============================================================
   Tech Stack Marquee
   ============================================================ */

const TechMarquee = () => {
  return (
    <div className="bento-card bento-tech">
      <span className="tech-label">Tech-Stack & Tools:</span>

      <div className="tech-marquee">
        <div className="tech-track">

          {/* Primary Track */}
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

          {/* Duplicate Track for the Seamless Infinite Loop */}
          <div
            className="tech-items"
            aria-hidden="true"
          >
            {TECH_STACK.map((item) => (
              <TechItem
                key={`duplicate-${item.id}`}
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
  const [quote] = useState(() => {
    const randomIndex = Math.floor(
      Math.random() * HERO_QUOTES.length
    );

    return HERO_QUOTES[randomIndex];
  });

  return (
    <section className="hero-section">
      <div className="hero-bento">

        {/* Main Introduction Card */}
        <div className="bento-card bento-main">

          <p className="code-tag">
            <span className="code-bracket">
              {'<span>'}
            </span>{' '}

            Hello, I'm{' '}

            <span className="hero-name">
              Yasser Fekry
            </span>{' '}

            <span className="code-bracket">
              {'</span>'}
            </span>
          </p>

          <h1 className="hero-title">
            a{' '}
            <span className="highlight-green">
              {'{CS Student & Security Researcher}'}
            </span>{' '}
            &
            <br />
            Offensive Security Practitioner{' '}
            <span className="blinking-cursor">
              ..
            </span>
          </h1>

          <div className="code-tag-p">
            <p>
              <span className="code-bracket">
                {'<p>'}
              </span>{' '}

              <span className="hero-description">
                I am a{' '}
                <span className="pink-highlight">
                  Computer Science Undergraduate
                </span>{' '}
                specializing in{' '}

                <span className="pink-highlight">
                  Web Application Penetration Testing
                </span>
                ,{' '}

                <span className="pink-highlight">
                  API Security
                </span>
                , and{' '}

                <span className="pink-highlight">
                  Vulnerability Research
                </span>
                .

                Practicing through platforms like HackerOne and Bugcrowd, I build custom reconnaissance automation toolkits and focus on offensive security methodologies.
              </span>{' '}

              <span className="code-bracket">
                {'</p>'}
              </span>
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bento-card bento-profile">

          <div className="profile-avatar-glow">

            <img
              src={profilePhoto}
              alt="Yasser Fekry"
              className="author-img"
            />

            <div className="profile-badge">
              <span>0X01</span>
            </div>

          </div>

          {/* Dynamic Quote */}
          <blockquote className="hero-quote">

            <div
              className="hero-quote__mark"
              aria-hidden="true"
            >
              <Quote
                size={20}
                strokeWidth={2.5}
              />

              <span className="hero-quote__bars">
                <i />
                <i />
              </span>
            </div>

            <p className="hero-quote__text">
              {quote}
            </p>

          </blockquote>

        </div>

        {/* Technology Stack Marquee */}
        <TechMarquee />

      </div>
    </section>
  );
};

export default Hero;
