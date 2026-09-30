// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Builds a compact page list: always shows first, last and the pages around
 * the current one. Gaps are returned as strings (e.g. "gap-3") so they can
 * be used as React keys and rendered as an ellipsis.
 *   [1, 'gap-1', 4, 5, 6, 'gap-6', 12]
 */
function getPageRange(current, total, siblings = 1) {
  const pages = new Set([1, total]);

  for (let i = current - siblings; i <= current + siblings; i++) {
    if (i > 1 && i < total) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);

  return sorted.flatMap((page, index) => {
    const previous = sorted[index - 1];
    return previous && page - previous > 1 ? [`gap-${previous}`, page] : [page];
  });
}

const baseButton =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-full border text-xs font-mono font-semibold transition-colors';
const idleButton =
  'border-line bg-panel-2 text-text-dim hover:border-accent hover:text-heading';
const activeButton = 'border-transparent bg-accent text-ink';

export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        className={`${baseButton} ${idleButton} disabled:cursor-not-allowed disabled:opacity-30`}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {getPageRange(currentPage, totalPages).map((item) =>
        typeof item === 'string' ? (
          <span key={item} aria-hidden="true" className="px-1 text-text-dim">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`${baseButton} ${item === currentPage ? activeButton : idleButton}`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
        className={`${baseButton} ${idleButton} disabled:cursor-not-allowed disabled:opacity-30`}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}
