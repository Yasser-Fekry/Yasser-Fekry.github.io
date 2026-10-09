// src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import {
  getFolders,
  getFolder,
  getPostsByFolder,
  getRootPosts,
} from '../utils/mdLoader';
import BlogCard from '../components/BlogCard';
import FolderCard from '../components/FolderCard';
import '../styles/blog.css';      // theme tokens (colors, fonts)
import '../styles/blog-page.css'; // page, cards, pagination

const ITEMS_PER_PAGE = 9;

export default function Blog() {
  const [searchParams] = useSearchParams();
  const folderSlug = searchParams.get('folder');
  const activeFolder = folderSlug ? getFolder(folderSlug) : null;

  // Main view: folders first, then posts that are not inside any folder
  const items = activeFolder
    ? getPostsByFolder(folderSlug)
    : [...getFolders(), ...getRootPosts()];

  const [currentPage, setCurrentPage] = useState(1);

  // Back to page 1 when switching folder
  useEffect(() => setCurrentPage(1), [folderSlug]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* Header */}
        <header className="blog-header">
          {activeFolder ? (
            <>
              <Link to="/blog" className="blog-back">
                <LucideChevronLeft size={14} /> All folders
              </Link>
              <h1 className="blog-title">{activeFolder.cardTitle}</h1>
              {activeFolder.description && (
                <p className="blog-subtitle">{activeFolder.description}</p>
              )}
            </>
          ) : (
            <h1 className="blog-title"> [My-Blog] </h1>
          )}
        </header>

        {folderSlug && !activeFolder && (
          <p className="blog-empty">Folder not found.</p>
        )}

        {/* Grid */}
        <div className="blog-grid">
          {currentItems.map((item) =>
            item.isFolder ? (
              <FolderCard key={`folder-${item.slug}`} folder={item} />
            ) : (
              <BlogCard key={item.slug} post={item} />
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            <button
              type="button"
              className="page-nav"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <LucideChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn${currentPage === page ? ' page-btn--active' : ''}`}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="page-nav"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <LucideChevronRight size={5} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
