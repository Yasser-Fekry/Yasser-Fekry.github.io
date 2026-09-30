// src/components/BlogCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CardImage({ src, title }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="aspect-video w-full overflow-hidden border-b border-line bg-panel-2">
      {src && !failed ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden="true"
          className="h-full w-full bg-panel-2"
        />
      )}
    </div>
  );
}

export default function BlogCard({ post }) {
  const { slug, title, readTime, image } = post;

  return (
    <article className="card h-full overflow-hidden p-0">
      <Link
        to={`/blog/${slug}`}
        className="group flex h-full flex-col no-underline hover:no-underline"
      >
        <CardImage src={image} title={title} />

        <div className="flex flex-1 items-start justify-between gap-4 p-5">
          <h2 className="mb-0 text-xl leading-snug transition-colors group-hover:text-accent">
            {title}
          </h2>

          {readTime && (
            <span className="shrink-0 font-mono text-xs text-text-dim">
              {readTime}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
