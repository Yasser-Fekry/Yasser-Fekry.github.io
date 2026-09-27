function Certifications() {
  const certs = [
    { name: "OSCP", status: "In progress" },
    { name: "eJPT", status: "Planned" },
  ];

  return (
    <section className="container section">
      <h2>Certifications</h2>
      {certs.length === 0 ? (
        <p>Certifications and security training will be listed here.</p>
      ) : (
        <ul>
          {certs.map((cert) => (
            <li
              key={cert.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderTop: "1px solid var(--line)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9rem",
              }}
            >
              <span>{cert.name}</span>
              <span style={{ color: "var(--text-dim)" }}>{cert.status}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Certifications;
