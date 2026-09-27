function Arsenal() {
  const groups = [
    {
      label: "Recon & Testing",
      tools: ["Burp Suite", "Caido", "Nmap", "ffuf"],
    },
    {
      label: "Scripting",
      tools: ["JavaScript", "Python", "Bash"],
    },
    {
      label: "Build",
      tools: ["React", "Node.js"],
    },
    {
      label: "Environment",
      tools: ["Linux"],
    },
  ];

  return (
    <section className="container section">
      <h2>Security arsenal</h2>
      {groups.map((group) => (
        <div key={group.label} style={{ marginBottom: 24 }}>
          <h3 style={{ color: "var(--text-dim)", fontWeight: 500, fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
            {group.label}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {group.tools.map((tool) => (
              <span key={tool} className="tag">{tool}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Arsenal;
