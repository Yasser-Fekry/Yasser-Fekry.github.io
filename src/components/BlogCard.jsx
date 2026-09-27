import { Link } from "react-router-dom";

function BlogCard({ title, description, slug }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/blog/${slug}`}>Read article →</Link>
    </article>
  );
}
export default BlogCard;
