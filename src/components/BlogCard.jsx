// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';
import CardImage from './CardImage';
import '../styles/blog-page.css';

export default function BlogCard({ post }) {
  const { slug, cardTitle, readTime, image } = post;

  return (
    <article className="blog-card">
      <Link to={`/blog/${slug}`} className="blog-card__link">
        <CardImage src={image} />

        <div className="blog-card__body">
          <div className="blog-card__row">
            <h4 className="blog-card__title">{cardTitle}</h4>
            {readTime && <span className="blog-card__time">{readTime}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
