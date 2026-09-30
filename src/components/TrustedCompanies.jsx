import React from 'react';
import '../styles/trusted.css';

import bugcrowd from '../assets/partners/bugcrowd.png';
import hackerone from '../assets/partners/hackerone_logo_white.png';
import yeswehack from '../assets/partners/yeswehack.png';
import porswiger from '../assets/partners/PortSwigger.png'
// import intigriti from '../assets/partners/intigriti.png';  // add the file, then uncomment

const platforms = [
  { name: 'Bugcrowd', url: 'https://www.bugcrowd.com', img: bugcrowd },
  { name: 'HackerOne', url: 'https://www.hackerone.com', img: hackerone },
  {
    name: 'Intigriti',
    url: 'https://www.intigriti.com',
    // img: intigriti,   // <- uncomment with the import above to replace the text
    mark: (
      <span className="tc-word" style={{ color: '#6f7cff' }}>
        intigriti
      </span>
    ),
  },
  { name: 'YesWeHack', url: 'https://www.yeswehack.com', img: yeswehack },
  {name:'Poertswiger', url:'t.com' , img: porswiger },
];

function Logo({ name, url, img, mark, hidden }) {
  return (
    <a
      className="tc-logo"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      tabIndex={hidden ? -1 : undefined}
    >
      {img ? <img src={img} alt={hidden ? '' : name} draggable="false" /> : mark}
    </a>
  );
}

export default function TrustedCompanies() {
  return (
    <section className="tc-section" id="platforms">
      <div className="tc-bento">
        <div className="bento-card tc-card">
          <header className="tc-header">
            <h2 className="tc-title">Active On  Platforms</h2>
            <p className="tc-text">
              Identifying, exploiting, and responsibly disclosing real-world
              vulnerabilities through global bug bounty programs.
            </p>
          </header>

          <div className="tc-marquee">
            <div className="tc-track">
              {[0, 1].map((group) => (
                <div
                  className="tc-group"
                  key={group}
                  aria-hidden={group === 1 || undefined}
                >
                  {[...platforms, ...platforms].map((p, i) => (
                    <Logo
                      key={`${group}-${p.name}-${i}`}
                      {...p}
                      hidden={group === 1 || i >= platforms.length}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
