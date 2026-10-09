import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Lock,
} from "lucide-react";

import "../styles/LatestProjects.css";
import portfolioImg from "../assets/images/Projects/image.png";
import phishGuardImg from "../assets/images/Projects/image copy.png";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const PROJECTS = [
  {
    id: "portfolio",
    title: "My-Portfolio",
    type: "Web-APP",
    year: "2026",
    description:
      "Personal security researcher portfolio built with React, featuring technical writing, project documentation, and a theme-aware interface.",
    url: "https://yasser-fekry.github.io/",
    repo: "https://github.com/Yasser-Fekry/Yasser-Fekry.github.io.git",
    image: portfolioImg,
  },
    {
    id: "3",
    title: "vuln-dashboard",
    type: "Web-APP",
    year: "2025",
    description:
      "Dashboard to manage your reports and writeups, and improve your methodology and mindset.",
    url: "https://github.com/Yasser-Fekry/vuln-dashboard/releases/tag/Main",
    repo: "https://github.com/Yasser-Fekry/vuln-dashboard.git",
    image: phishGuardImg,
  },
  {
    id: "phish-guard",
    title: "Web-Scanner",
    type: "Security-Tool",
    year: "2027",
    description:
      "A web Appliction to  Find and automation the vulnirabilities of websites To Find Bugs web applications, built with React and Node.js.",
  },
];

/* =========================================================
   PREVIEW (image or fallback — same size everywhere)
   ========================================================= */

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);
  if (project.image && !failed) {
    return (
      <div className="pj-preview">
        <img
          className="pj-preview-image"
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
        <div className="pj-preview-shade" />
      </div>
    );
  }

  return (
    <div className="pj-preview pj-preview-empty">
      <div className="pj-preview-grid" />
      <div className="pj-preview-mark">
        <span>{project.title.charAt(0)}</span>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT LINKS
   ========================================================= */

function ProjectLinks({ project }) {
  const live = project.url && project.url !== project.repo;
  const repo = Boolean(project.repo);
  if (!live && !repo) {
    return (
      <span className="pj-private">
        <Lock size={14} aria-hidden="true" />
        Private
      </span>
    );
  }
  return (
    <div className="pj-links">
      {live && (
        <a
          href={project.url}
          className="pj-action pj-action-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Live</span>
          <ArrowUpRight size={10} aria-hidden="true" />
        </a>
      )}
      {repo && (
        <a
          href={project.repo}
          className="pj-action pj-action-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={15} aria-hidden="true" />
          <span>Source</span>
        </a>
      )}
    </div>
  );
}

/* =========================================================
   PROJECT CARD — one component, used for every project
   ========================================================= */

function ProjectCard({ project, number }) {
  const label = String(number).padStart(2, "0");
  return (
    <article className="pj-card">
      <div className="pj-card-preview">
        <ProjectPreview project={project} />
        <span className="pj-card-number">{label}</span>
      </div>

      <div className="pj-card-body">
        <div className="pj-project-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="pj-card-title">{project.title}</h3>
        <p className="pj-card-description">{project.description}</p>
        <div className="pj-card-footer">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SECTION
   ========================================================= */

export default function LatestProjects() {
  return (
    <section
      className="pj-section"
      aria-labelledby="projects-heading"
    >
      <div className="pj-container">
        {/* HEADER */}
   <header className="pj-header">
  <div className="pj-header-left">
    <h2 id="projects-heading" className="pj-heading">
      Projects
      <span className="pj-heading-dot">:</span>
    </h2>
  </div>

  <div className="pj-header-right">
    <p className="pj-intro">
    </p>
    <span className="pj-total">
      {String(PROJECTS.length).padStart(2, "0")} PROJECTS
    </span>
  </div>
</header>
        {/* GRID — every project is the same card */}
        <div className="pj-grid" role="list">
          {PROJECTS.map((project, i) => (
            <div role="listitem" key={project.id}>
              <ProjectCard project={project} number={i + 1} />
            </div>
          ))}
        </div>

{/*
---------------- */}
        {/* FOOTER */}
        <footer className="pj-footer">
          <span className="pj-footer-line" />
          <span className="pj-footer-text">
          </span>
          <span className="pj-footer-line" />
        </footer>

      </div>
    </section>
  );
}
