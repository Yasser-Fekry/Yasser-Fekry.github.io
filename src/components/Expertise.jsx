import { motion, useReducedMotion } from "motion/react";
import { Bug, Network, CloudCog, ShieldHalf, ChartSpline } from "lucide-react";
import "../styles/expertise.css";

const AREAS = [
  {
    icon: <span className="expertise-api">API</span>,
    title: "API Security Testing",
    text: "In-depth testing to uncover vulnerabilities in APIs and secure data transmission.",
  },
  {
    icon: <Bug size={22} strokeWidth={2} />,
    title: "Web Application Security",
    text: "Identifying and patching vulnerabilities like authentication bypasses and business logic flaws.",
  },
  {
    icon: <Network size={22} strokeWidth={2} />,
    title: "Network Security Audits",
    text: "Assessing network infrastructure to ensure robust security measures.",
  },
  {
    icon: <CloudCog size={22} strokeWidth={2} />,
    title: "Cloud Security",
    text: "Ensuring secure configurations and policies for cloud platforms like AWS and Azure.",
  },
  {
    icon: <ShieldHalf size={22} strokeWidth={2} />,
    title: "Red Team Operations",
    text: "Simulating advanced attack scenarios to identify and strengthen weak points in systems.",
  },
  {
    icon: <ChartSpline size={22} strokeWidth={2} />,
    title: "Vulnerability Assessment",
    text: "Comprehensive analysis of applications and systems to discover complex security risks.",
  },
];

export default function Expertise() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="expertise-section" aria-labelledby="expertise-title">
      <div className="expertise-bento">
        <div className="bento-card expertise-card">
          <header className="expertise-header">


            <h2 id="expertise-title" className="expertise-title">

              <span className="expertise-title-dim"> Cybersecurity-knowledge</span>
            </h2>
          </header>
          <div className="expertise-grid">
            {AREAS.map(({ icon, title, text }, i) => (
              <motion.article
                className="expertise-item"
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              >
                <div className="expertise-icon" aria-hidden="true">
                  {icon}
                </div>
                <h3 className="expertise-item-title">{title}</h3>
                <p className="expertise-item-text">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
