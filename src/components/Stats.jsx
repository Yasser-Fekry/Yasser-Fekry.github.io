import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Crown, Landmark, Bug, Award } from "lucide-react";
import "../styles/stats.css";

const STATS = [
  { icon: Crown, value: 1, label: "Years of Security Research" },
  { icon: Landmark, value: 50, label: "Security Labs" },
  { icon: Bug, value: 10, label: "Security Projects" },
  { icon: Award, value: 5, label: "Core Security Areas" },
];

const pad = (n) => String(n).padStart(2, "0");

function Counter({ to }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(to);
      return;
    }
    if (!inView) return;

    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduceMotion]);

  return (
    <>
      {/* Screen readers get the final number, not the counting animation */}
      <span className="sr-only">{pad(to)}</span>
      <span ref={ref} aria-hidden="true">
        {pad(count)}
      </span>
    </>
  );
}

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Security research stats">
      <div className="stats-bento">
        <div className="bento-card stats-card">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div className="stat-item" key={label}>
              <Icon className="stat-icon" size={20} strokeWidth={2} aria-hidden="true" />

              <div className="stat-number">
                <Counter to={value} />
                <span className="stat-plus" aria-hidden="true">+</span>
              </div>

              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
