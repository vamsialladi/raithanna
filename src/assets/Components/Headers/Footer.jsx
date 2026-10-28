import { useTranslation } from '../../../context/LanguageContext.jsx'

function Footer({ t: propT }) {
  let contextT = null
  try {
    const context = useTranslation()
    if (context && context.t) contextT = context.t
  } catch {
    // Rendered outside of context provider
  }

  const get = (key, propKey, fallback = '') => {
    if (propT && propKey && propT[propKey]) return propT[propKey]
    if (contextT) {
      const val = contextT(key)
      if (val && val !== key) return val
    }
    return fallback
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-brand__identity" href="#home">
              <img
                className="footer-brand__logo"
                src="/raithanna-logo.png"
                alt={get('footerTagline', 'nextGenerationFarmer', 'Raithanna')}
              />
            </a>
            <p>
              {get(
                'footerDescription',
                'footerDescription',
                'Building a connected agricultural ecosystem where land, people, technology and markets work together for a stronger, more sustainable future.'
              )}
            </p>
          </div>

          <div className="footer-links">
            <h2>{get('footerQuickLinks', 'quickLinks', 'Quick links')}</h2>
            <a href="#home">{get('navHome', 'home', 'Home')}</a>
            <a href="#about">{get('footerAboutLink', 'aboutRaithanna', 'About Raithanna')}</a>
            <a href="#services">{get('footerServicesLink', 'ourServices', 'Our services')}</a>
            <a href="#contact">{get('footerContactLink', 'contact', 'Contact')}</a>
          </div>

          <div className="footer-social">
            <h2>{get('footerFollowUs', 'followUs', 'Follow us')}</h2>
            <div className="footer-social__links">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a>
              <a href="https://x.com/" aria-label="X">X</a>
              <a href="https://www.youtube.com/" aria-label="YouTube">▶</a>
              <a href="https://www.instagram.com/" aria-label="Instagram">◎</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {get('footerAllRightsReserved', 'allRightsReserved', 'Raithanna. All rights reserved.')}</span>
          <div>
            <a href="#privacy">{get('footerPrivacy', 'privacyPolicy', 'Privacy policy')}</a>
            <span aria-hidden="true">|</span>
            <a href="#terms">{get('footerTerms', 'termsOfService', 'Terms of service')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer