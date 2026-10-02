import { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import '../styles/backtotop.css';

const SHOW_AFTER = 300;

const getRoot = () => document.scrollingElement || document.documentElement;

/** Elements (other than the page) that are currently scrolled down. */
function getScrolledContainers() {
  const out = [];
  document.body.querySelectorAll('*').forEach((el) => {
    if (el.scrollTop > 0) out.push(el);
  });
  return out;
}

function currentTop() {
  return Math.max(window.scrollY, getRoot().scrollTop, document.body.scrollTop);
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);
  const animatingRef = useRef(false);

  /* ---------- Show / hide ---------- */
  useEffect(() => {
    let ticking = false;
    let lastTarget = null;

    const update = () => {
      let top = currentTop();
      if (
        lastTarget &&
        lastTarget !== document &&
        lastTarget !== window &&
        typeof lastTarget.scrollTop === 'number'
      ) {
        top = Math.max(top, lastTarget.scrollTop);
      }
      setVisible(top > SHOW_AFTER);
      ticking = false;
    };

    const onScroll = (e) => {
      lastTarget = e?.target ?? null;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () =>
      window.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  /* ---------- Cancel animation on unmount ---------- */
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /* ---------- Scroll to top ---------- */
  const scrollToTop = useCallback(() => {
    if (animatingRef.current) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const root = getRoot();
    const html = document.documentElement;
    const containers = getScrolledContainers();

    // Turn off anything that can interfere with scrolling
    const prev = {
      behavior: html.style.scrollBehavior,
      snap: html.style.scrollSnapType,
      pad: html.style.scrollPaddingTop,
    };
    html.style.scrollBehavior = 'auto';
    html.style.scrollSnapType = 'none';
    html.style.scrollPaddingTop = '0px';

    const setAll = (y) => {
      window.scrollTo(0, y);
      root.scrollTop = y;
      document.body.scrollTop = y;
      containers.forEach((el) => {
        el.scrollTop = Math.min(el.scrollTop, y === 0 ? 0 : el.scrollTop);
      });
    };

    const finish = () => {
      animatingRef.current = false;
      html.style.scrollBehavior = prev.behavior;
      html.style.scrollSnapType = prev.snap;
      html.style.scrollPaddingTop = prev.pad;
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };

    function cancel() {
      cancelAnimationFrame(rafRef.current);
      finish();
    }

    // Instant jump for reduced motion or if already at the top
    const startY = currentTop();
    const startContainers = containers.map((el) => el.scrollTop);

    if (reduceMotion || (startY === 0 && startContainers.every((v) => v === 0))) {
      setAll(0);
      containers.forEach((el) => (el.scrollTop = 0));
      finish();
      return;
    }

    animatingRef.current = true;
    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });
    window.addEventListener('keydown', cancel, { once: true });

    const maxStart = Math.max(startY, ...startContainers);
    const duration = Math.min(900, 350 + maxStart * 0.12);
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      const k = 1 - ease(t);

      window.scrollTo(0, Math.round(startY * k));
      containers.forEach((el, i) => {
        el.scrollTop = Math.round(startContainers[i] * k);
      });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      // Settle: keep forcing 0 for a few frames in case layout shifts
      let settleFrames = 0;
      const settle = () => {
        window.scrollTo(0, 0);
        root.scrollTop = 0;
        document.body.scrollTop = 0;
        containers.forEach((el) => (el.scrollTop = 0));

        settleFrames += 1;
        if (currentTop() > 0 && settleFrames < 20) {
          rafRef.current = requestAnimationFrame(settle);
        } else {
          finish();
        }
      };
      settle();
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
