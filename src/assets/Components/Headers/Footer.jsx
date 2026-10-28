function Footer({ t }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-brand__identity" href="#home">
              <img className="footer-brand__logo" src="/raithanna-logo.png" alt={t.nextGenerationFarmer} />
            </a>
            <p>
              {t.footerDescription}
            </p>
          </div>

          <div className="footer-links">
            <h2>{t.quickLinks}</h2>
            <a href="#home">{t.home}</a>
            <a href="#about">{t.aboutRaithanna}</a>
            <a href="#services">{t.ourServices}</a>
            <a href="#contact">{t.contact}</a>
          </div>

          <div className="footer-social">
            <h2>{t.followUs}</h2>
            <div className="footer-social__links">
              <a href="https://www.linkedin.com/" aria-label={t.linkedin}>in</a>
              <a href="https://x.com/" aria-label="X">X</a>
              <a href="https://www.youtube.com/" aria-label={t.youtube}>▶</a>
              <a href="https://www.instagram.com/" aria-label={t.instagram}>◎</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Raithanna. {t.allRightsReserved}</span>
          <div>
            <a href="#privacy">{t.privacyPolicy}</a>
            <span aria-hidden="true">|</span>
            <a href="#terms">{t.termsOfService}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer