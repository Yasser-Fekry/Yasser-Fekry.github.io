// src/components/FolderCard.jsx
import { Link } from 'react-router-dom';
import { LucideFolder } from 'lucide-react';
import CardImage from './CardImage';
import '../styles/blog-page.css';

export default function FolderCard({ folder }) {
  const { slug, cardTitle, description, image, count } = folder;

  return (
    <article className="blog-card">
      <Link
        to={`/blog?folder=${encodeURIComponent(slug)}`}
        className="blog-card__link"
      >
        <CardImage src={image}>
        </CardImage>

        <div className="blog-card__body">
          <h4 className="blog-card__title blog-card__title--folder">{cardTitle}</h4>
          {description && <p className="blog-card__desc">{description}</p>}
        </div>
      </Link>
    </article>
  );
}
