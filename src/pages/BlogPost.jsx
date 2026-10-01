// src/pages/BlogPost.jsx
import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '../utils/mdLoader';
import '../styles/blog.css';


const SITE_NAME = 'My-Blog';

// Open external links in a new tab; keep internal links in the SPA.
const markdownComponents = {
  a: ({ href = '', children }) => {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    );
  },
};

function BackLink() {
  return (
    <Link
      to="/blog"
      className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-text-dim no-underline transition-colors hover:text-accent hover:no-underline"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back to posts
    </Link>
  );
}

function PostNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-2xl">Post not found</h1>
      <p className="mb-6 text-text-dim">
        This post may have been moved or removed.
      </p>
      <BackLink />
    </main>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  // Page title + reset scroll when navigating between posts
  useEffect(() => {
    if (!post) {
      document.title = `Not found | ${SITE_NAME}`;
    } else {
      // Uses the real title only (never the file name)
      document.title = post.title ? `${post.title} | ${SITE_NAME}` : SITE_NAME;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <PostNotFound />;

  // Only render the header if there is something to show in it
  const hasHeader = Boolean(post.date || post.title);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <BackLink />

      {hasHeader && (
        <header className="mb-10 text-center">
          {post.date && (
            <p className="mb-3 font-mono text-xs text-text-dim">{post.date}</p>
          )}
          {post.title && (
            <h1 className="mb-0 text-3xl sm:text-4xl">{post.title}</h1>
          )}
        </header>
      )}

      <article className="blog-content">
        <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
