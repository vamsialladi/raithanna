function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-brand__identity" href="#home">
              <img className="footer-brand__logo" src="/raithanna-logo.png" alt="Raithanna — The next generation farmer" />
            </a>
            <p>
              Building a connected agricultural ecosystem where land, people,
              technology and markets work together for a stronger, more
              sustainable future.
            </p>
          </div>

          <div className="footer-links">
            <h2>Quick links</h2>
            <a href="#home">Home</a>
            <a href="#about">About Raithanna</a>
            <a href="#services">Our services</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-social">
            <h2>Follow us</h2>
            <div className="footer-social__links">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a>
              <a href="https://x.com/" aria-label="X">X</a>
              <a href="https://www.youtube.com/" aria-label="YouTube">▶</a>
              <a href="https://www.instagram.com/" aria-label="Instagram">◎</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Raithanna. All rights reserved.</span>
          <div>
            <a href="#privacy">Privacy policy</a>
            <span aria-hidden="true">|</span>
            <a href="#terms">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer