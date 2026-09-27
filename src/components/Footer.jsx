function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
      <div className="container" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-dim)" }}>
        © {new Date().getFullYear()} Yasser Fekry — built with React
      </div>
    </footer>
  );
}

export default Footer;
