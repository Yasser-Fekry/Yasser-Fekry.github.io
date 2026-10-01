import '../styles/cmmingsoon.css'

function ComingSoon() {
return ( <section className="coming-soon"> <div className="coming-soon-content"> <p className="coming-soon-eyebrow">Resume</p>

    <h1 className="coming-soon-title">
      Coming <span>Soon.</span>
    </h1>

    <p className="coming-soon-description">
      My CV is currently being prepared and will be available soon.
    </p>

    <div className="coming-soon-status">
      <span className="coming-soon-status-dot" />
      <span>In progress</span>
    </div>
  </div>
</section>

);
}

export default ComingSoon;
