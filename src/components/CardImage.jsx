// src/components/CardImage.jsx
import { useState } from 'react';
import '../styles/blog-page.css';

export default function CardImage({ src, children }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="card-media">
      {src && !failed && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable="false"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`card-media__img${loaded ? ' is-loaded' : ''}`}
        />
      )}

      <div className="card-media__fade" aria-hidden="true" />
      {children}
    </div>
  );
}
