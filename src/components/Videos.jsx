import '../styles/Video.css';

function Videos() {
  return (
    <section className="video-page">
      <div className="video-content">
        <p className="video-eyebrow">Video</p>

        <h1 className="video-title">
          Coming <span>Soon.</span>
        </h1>

        <p className="video-description">
          Security research, tutorials, and technical videos
          will be available here soon.
        </p>

        <div className="video-status">
          <span className="video-status-dot" />
          <span>In progress</span>
        </div>
      </div>
    </section>
  );
}

export default Videos;
