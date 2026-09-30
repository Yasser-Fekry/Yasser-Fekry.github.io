import React from 'react';
import '../styles/skills.css';
import { FaPython, FaAws, FaLinux, FaDocker } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import {
  SiBurpsuite,
  SiWireshark,
  SiPostman,
  SiKalilinux,
  SiGo,
} from 'react-icons/si';

// Each icon gets its own brand color
const rowOne = [
  { name: 'Python', Icon: FaPython, color: '#3b9ae1' },
  { name: 'Burp Suite', Icon: SiBurpsuite, color: '#ff6633' },
  { name: 'AWS', Icon: FaAws, color: '#ff9900' },
  { name: 'Wireshark', Icon: SiWireshark, color: '#1679a7' },
  { name: 'Azure', Icon: VscAzure, color: '#0089d6' },
];

const rowTwo = [
  { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
  { name: 'Linux', Icon: FaLinux, color: 'currentColor' },
  { name: 'Kali Linux', Icon: SiKalilinux, color: '#367bf0' },
  { name: 'Go', Icon: SiGo, color: '#00add8' },
  { name: 'Docker', Icon: FaDocker, color: '#2496ed' },
];

const details = [
  { title: 'Application Security', text: 'API and web app testing' },
  { title: 'Network Security', text: 'Traffic analysis and configuration' },
  { title: 'Cloud Platforms', text: 'AWS, Azure, and Google Cloud audits' },
  { title: 'Tools & Techniques', text: 'Burp Suite, Postman, Wireshark' },
  { title: 'Others', text: 'Reporting and red teaming.' },
];

// The list is rendered twice so the loop looks seamless
function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="skills-marquee">
      <div className={`skills-track ${reverse ? 'skills-track--reverse' : ''}`}>
        {[...items, ...items].map(({ name, Icon, color }, i) => (
          <div
            className="skills-tile"
            key={`${name}-${i}`}
            title={name}
            aria-hidden={i >= items.length}
          >
            <Icon size={38} color={color} aria-label={name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-bento">
      <div className="bento-card skills-card">
        {/* decorative circles, top right */}
        <div className="skills-orbit" aria-hidden="true">
          <span className="skills-orbit__ring skills-orbit__ring--1" />
          <span className="skills-orbit__ring skills-orbit__ring--2" />
          <span className="skills-orbit__ring skills-orbit__ring--3" />
          <span className="skills-orbit__dot skills-orbit__dot--1" />
          <span className="skills-orbit__dot skills-orbit__dot--2" />
        </div>

        <header className="skills-header">
          <p className="skills-eyebrow">
            <span className="" />
            Technologies
          </p>
          <h2 className="skills-title">My-Skills</h2>
        </header>

        <div className="skills-body">
          <div className="skills-icons">
            <MarqueeRow items={rowOne} />
            <MarqueeRow items={rowTwo} reverse />
          </div>

          <div className="skills-divider" />

          <ul className="skills-list">
            {details.map(({ title, text }) => (
              <li key={title}>
                <strong>{title}</strong> <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
