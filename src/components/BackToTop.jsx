import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import '../styles/backtotop.css';

const SHOW_AFTER = 300;

/** Collect every element that is currently scrolled down. */
function getScrolledElements() {
  const result = [];
  const all = document.body.querySelectorAll('*');
  for (const el of all) {
    if (el.scrollTop > 0) result.push(el);
  }
  return result;
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastTarget = null;

    const update = () => {
      const root = document.scrollingElement || document.documentElement;
      let top = Math.max(window.scrollY, root.scrollTop, document.body.scrollTop);

      // Support inner scroll containers (scroll events don't bubble, so we capture them)
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

    const handleScroll = (e) => {
      lastTarget = e?.target ?? null;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update(); // correct state on mount
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () =>
      window.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  const scrollToTop = useCallback(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const behavior = reduceMotion ? 'auto' : 'smooth';

    const root = document.scrollingElement || document.documentElement;
    const containers = getScrolledElements();

    // Scroll the window / document
    window.scrollTo({ top: 0, behavior });
    root.scrollTo?.({ top: 0, behavior });
    document.body.scrollTo?.({ top: 0, behavior });

    // Scroll any inner scroll container
    containers.forEach((el) => el.scrollTo?.({ top: 0, behavior }));

    // Fallback: if smooth scrolling was blocked (scroll-snap, CSS, libraries), jump instantly
    window.setTimeout(() => {
      const stillScrolled =
        window.scrollY > 0 ||
        root.scrollTop > 0 ||
        document.body.scrollTop > 0 ||
        containers.some((el) => el.scrollTop > 0);

      if (stillScrolled) {
        window.scrollTo(0, 0);
        root.scrollTop = 0;
        document.body.scrollTop = 0;
        containers.forEach((el) => {
          el.scrollTop = 0;
        });
      }
    }, reduceMotion ? 50 : 900);
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
