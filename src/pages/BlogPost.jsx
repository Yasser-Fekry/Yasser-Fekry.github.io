import { useParams, Link } from "react-router-dom";

function BlogPost() {
  const { slug } = useParams();

  return (
    <article className="container section">
      <Link to="/blog">← Back to Blog</Link>
      <h1>{slug}</h1>
      <p>
        This is where the Markdown content for this article will be rendered.
      </p>
    </article>
  );
}

export default BlogPost;
