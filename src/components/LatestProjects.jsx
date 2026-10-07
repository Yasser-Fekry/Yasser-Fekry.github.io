import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Lock, ShieldAlert, FolderOpen } from "lucide-react";
import "../styles/LatestProjects.css";

/* ------------------------------------------------------------------ */
/*  Data Setup                                                        */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "portfolio",
    title: "My Portfolio",
    type: "Personal website",
    category: "web",
    year: "2025",
    status: "live",
    description:
      "Personal profile site with a dark/light theme and a clean glass interface. Built with React and Tailwind v4.",
    url: "https://yasser-fekry.github.io/",
    repo: "https://github.com/your-name/portfolio",
    image: "/src/assets/images/Projects/image.png",
  },
  {
    id: "recon-kit",
    title: "ReconKit",
    type: "Recon automation",
    category: "security",
    year: "2025",
    status: "live",
    description:
      "Modular recon pipeline that chains subdomain enumeration, port scanning and screenshotting into one structured report.",
    url: "https://github.com/your-name/reconkit",
    repo: "https://github.com/your-name/reconkit",
  },
  {
    id: "threat-dash",
    title: "ThreatDash",
    type: "SOC dashboard",
    category: "security",
    year: "2025",
    status: "wip",
    description:
      "Real-time alert triage dashboard mapping detections to MITRE ATT&CK techniques with automated one-click case creation.",
    url: "https://example.com/threatdash",
  },
  {
    id: "phish-guard",
    title: "PhishGuard",
    type: "Browser extension",
    category: "security",
    year: "2024",
    status: "private",
    description:
      "Lightweight phishing detector that scores pages client-side using URL heuristics and a small, fast on-device model.",
  },
  {
    id: "ctf-toolbox",
    title: "CTF Toolbox",
    type: "CLI toolkit",
    category: "tools",
    year: "2024",
    status: "live",
    description:
      "Single binary bundling the encoding, crypto and forensics helpers I reach for during fast-paced CTF competitions.",
    url: "https://example.com/ctf-toolbox",
    repo: "https://github.com/your-name/ctf-toolbox",
  },
  {
    id: "vuln-scanner",
    title: "VulnScanner Pro",
    type: "Security Audit Tool",
    category: "tools",
    year: "2025",
    status: "live",
    description:
      "Automated vulnerability scanner prioritizing common CVE configurations with detailed PDF report exports.",
    url: "https://example.com/vuln-scanner",
    repo: "https://github.com/your-name/vuln-scanner",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "security", label: "Security" },
  { id: "web", label: "Web Apps" },
  { id: "tools", label: "Tools" },
];

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  private: "Private",
  wip: "In progress",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const getHost = (url) => {
  if (!url) return "private";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
};

/* ------------------------------------------------------------------ */
/*  FallbackTile Component                                            */
/* ------------------------------------------------------------------ */

function FallbackTile({ title }) {
  const letter = title ? title.trim().charAt(0).toUpperCase() : "?";
  return (
    <div className="pjc-fallback">
      <span className="pjc-fallback-letter" aria-hidden="true">
        {letter}
      </span>
      <div className="pjc-fallback-grid" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProjectCard Component                                             */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, failed, onImgError }) {
  const [loaded, setLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const localImage = project.image?.trim();
  const hasImage = !failed && Boolean(localImage);
  const isWriteup = project.type?.toLowerCase().includes("writeup");
  const statusLabel = STATUS_LABEL[project.status] ?? project.status;

  const handleError = useCallback(() => {
    setLoaded(false);
    onImgError(project.id);
  }, [onImgError, project.id]);

  const motionProps = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96 },
      };

  return (
    <motion.article
      layout
      {...motionProps}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="pjc-card"
    >
      <div className="pjc-preview" data-loaded={loaded}>
        <div className="pjc-chrome">
          <span className="pjc-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="pjc-host">{getHost(project.url)}</span>
        </div>
        <div className="pjc-screen">
          {hasImage ? (
            <img
              src={localImage}
              alt={`Preview of ${project.title}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={handleError}
            />
          ) : (
            <FallbackTile title={project.title} />
          )}
        </div>
      </div>

      <div className="pjc-content">
        <div className="pjc-meta">
          <span className="pjc-type">
            {project.type} · {project.year}
          </span>
          <span className="pjc-status" data-status={project.status}>
            <i aria-hidden="true" />
            {statusLabel}
          </span>
        </div>

        <h3 className="pjc-title">{project.title}</h3>
        <p className="pjc-desc">{project.description}</p>

        {failed && (
          <p className="pjc-notice" role="status">
            <ShieldAlert size={13} aria-hidden="true" />
            Preview image unavailable
          </p>
        )}

        <div className="pjc-actions">
          {project.url ? (
            <a
              href={project.url}
              className="pjc-btn pjc-btn-main"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isWriteup ? "Read Writeup" : "Visit Project"}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="pjc-btn pjc-btn-disabled" aria-disabled="true">
              <Lock size={13} aria-hidden="true" />
              Private
            </span>
          )}

          {project.repo && (
            <a
              href={project.repo}
              className="pjc-btn pjc-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title}`}
            >
              <Github size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function LatestProjects() {
  const [filter, setFilter] = useState("all");
  const [failedImages, setFailedImages] = useState({});

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const markFailed = useCallback((id) => {
    setFailedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  // Update drag boundaries dynamically on resize
  useEffect(() => {
    const updateConstraints = () => {
      if (wrapperRef.current && trackRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const maxScroll = wrapperWidth - trackWidth;
        setDragConstraints({
          left: maxScroll < 0 ? maxScroll - 16 : 0,
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section className="pjc-section" aria-labelledby="pjc-heading">
      <div className="pjc-container">
        <header className="pjc-head">
          <h2 id="pjc-heading" className="pjc-heading">
            Latest Projects
          </h2>

          {/* Interactive Drag/Swipe Wrapper */}
          <div className="pjc-filters-wrapper" ref={wrapperRef}>
            <motion.nav
              ref={trackRef}
              className="pjc-filters"
              aria-label="Filter projects by category"
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
            >
              {CATEGORIES.map((cat) => {
                const active = filter === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    className="pjc-filter-btn"
                    data-active={active}
                    onClick={() => setFilter(cat.id)}
                  >
                    {active && (
                      <motion.span
                        layoutId="macOSActivePill"
                        className="pjc-filter-active-bg"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="pjc-filter-label">{cat.label}</span>
                    <span className="pjc-filter-badge">{count}</span>
                  </button>
                );
              })}
            </motion.nav>
          </div>
        </header>

        {filteredProjects.length === 0 ? (
          <div className="pjc-empty">
            <FolderOpen size={32} aria-hidden="true" />
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <motion.div layout className="pjc-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  failed={Boolean(failedImages[project.id])}
                  onImgError={markFailed}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
