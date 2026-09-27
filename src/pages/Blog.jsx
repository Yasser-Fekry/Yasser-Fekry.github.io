import BlogCard from "../components/BlogCard";

function Blog() {
  const posts = [
    {
      title: "Understanding IDOR",
      description:
        "Understanding Insecure Direct Object References and access control issues.",
      slug: "idor",
    },
    {
      title: "OAuth Security",
      description:
        "Notes and research about common OAuth security vulnerabilities.",
      slug: "oauth",
    },
    {
      title: "GraphQL Security",
      description:
        "Security testing concepts for GraphQL APIs.",
      slug: "graphql",
    },
  ];

  return (
    <section className="container section">
      <h1>Security Research Blog</h1>
      <div>
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            description={post.description}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default Blog;
