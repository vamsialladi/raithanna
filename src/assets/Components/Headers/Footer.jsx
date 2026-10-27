import { useTranslation } from '../../../context/LanguageContext.jsx'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-brand__identity" href="#home">
              <img className="footer-brand__logo" src="/raithanna-logo.png" alt="Raithanna — The next generation farmer" />
            </a>
            <p>
              {t('footerDescription')}
            </p>
          </div>

          <div className="footer-links">
            <h2>{t('footerQuickLinks')}</h2>
            <a href="#home">{t('navHome')}</a>
            <a href="#about">{t('footerAboutLink')}</a>
            <a href="#services">{t('footerServicesLink')}</a>
            <a href="#contact">{t('footerContactLink')}</a>
          </div>

          <div className="footer-social">
            <h2>{t('footerFollowUs')}</h2>
            <div className="footer-social__links">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a>
              <a href="https://x.com/" aria-label="X">X</a>
              <a href="https://www.youtube.com/" aria-label="YouTube">▶</a>
              <a href="https://www.instagram.com/" aria-label="Instagram">◎</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {t('footerAllRightsReserved')}</span>
          <div>
            <a href="#privacy">{t('footerPrivacy')}</a>
            <span aria-hidden="true">|</span>
            <a href="#terms">{t('footerTerms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer