// src/utils/mdLoader.js

const WORDS_PER_MINUTE = 200;
const EXCERPT_LENGTH = 160;

// Frontmatter must start the file and the closing --- must be on its own line
const FRONTMATTER_RE = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const KEY_RE = /^[A-Za-z_][\w-]*$/;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

/* ---------- Helpers ---------- */

const stripQuotes = (value) => value.replace(/^(['"])(.*)\1$/, '$2');

function parseValue(raw) {
  const value = raw.trim();

  // tags: [react, vite, css]
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
  return stripQuotes(value);
}

function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1 || line.trimStart().startsWith('#')) continue;

    const key = line.slice(0, separator).trim();
    if (!KEY_RE.test(key)) continue;

    data[key] = parseValue(line.slice(separator + 1));
  }

  return { data, body: raw.slice(match[0].length).trim() };
}

/** Markdown -> plain text, used for the excerpt and the read time. */
function toPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')            // code blocks
    .replace(/`([^`]*)`/g, '$1')                // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')      // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')    // links -> label
    .replace(/<[^>]+>/g, ' ')                   // html tags
    .replace(/^#{1,6}\s+/gm, '')                // heading marks
    .replace(/^>\s?/gm, '')                     // quotes
    .replace(/^\s*[-*+]\s+/gm, '')              // bullets
    .replace(/(\*\*|__|\*|~~)/g, '')            // emphasis
    .replace(/\s+/g, ' ')
    .trim();
}

function makeExcerpt(text) {
  if (text.length <= EXCERPT_LENGTH) return text;
  const cut = text.slice(0, EXCERPT_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(' ')).trim()}…`;
}

function getReadTime(text) {
  const words = text ? text.split(' ').length : 0;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
}

/**
 * Returns a Date at UTC midnight for the calendar day written in the file,
 * or null. Formatting in UTC avoids the "off by one day" bug that happens
 * when a local-time date is shown in a different timezone.
 */
function parseDate(value) {
  if (!value || typeof value !== 'string') return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  // "2026-09-12" is already parsed as UTC; other formats ("Sep 12, 2026") as local time
  return /^\d{4}-\d{2}-\d{2}/.test(value)
    ? parsed
    : new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
}

// File name -> readable text. Used ONLY for the card title, never on the post page.
const humanizeSlug = (slug) =>
  slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

// First image in the markdown; ignores an optional "title" after the URL
function findFirstImage(markdown) {
  const match = markdown.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/);
  return match ? match[1] : null;
}

/* ---------- Parser ---------- */

function parsePost(raw, filePath) {
  if (typeof raw !== 'string' || !raw.trim()) return null;

  const slug = filePath.split('/').pop().replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw);

  let content = body;
  let title = typeof data.title === 'string' ? data.title : '';

  // No title in frontmatter: use a leading "# Heading" (and remove it, so the
  // page doesn't show the same title twice). If there is none, `title` stays
  // empty so the post page shows nothing; the card falls back to the file name.
  if (!title) {
    const heading = content.match(/^#\s+(.+?)\s*#*\s*(?:\r?\n|$)/);
    if (heading) {
      title = heading[1];
      content = content.slice(heading[0].length).trim();
    }
  }

  const date = parseDate(data.date);
  const plainText = toPlainText(content);

  return {
    slug,
    title,                                  // real title only, may be empty
    cardTitle: title || humanizeSlug(slug), // card fallback: file name
    date: date ? dateFormatter.format(date) : '',
    timestamp: date ? date.getTime() : 0,
    readTime: data.readTime || getReadTime(plainText),
    image: data.image || findFirstImage(content) || null,
    excerpt: data.excerpt || data.description || makeExcerpt(plainText),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    content,
  };
}

/* ---------- Load once, reuse everywhere ---------- */

const modules = import.meta.glob('/src/content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const posts = Object.entries(modules)
  .map(([path, raw]) => parsePost(raw, path))
  .filter((post) => post && !(post.draft && import.meta.env.PROD)) // drafts show only in dev
  .sort((a, b) => b.timestamp - a.timestamp || a.cardTitle.localeCompare(b.cardTitle)); // newest first

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export const getAllPosts = () => posts;
export const getPostBySlug = (slug) => postsBySlug.get(slug);
