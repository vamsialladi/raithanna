function Footer() {
  const quickLinks = [
    ['About Us', '/#about'],
    ['Farmer Services', '/services'],
    ['News & Updates', '/contact'],
  ]

  const schemeLinks = [
    'Rythu Bharosa',
    'PM-KISAN',
    'Crop Insurance',
    'Subsidies',
    'Soil Health Card',
  ]

  return (
    <footer className="bg-[#103b19] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.15fr_1fr] lg:gap-10">
        <div>
          <a className="inline-flex items-center gap-2 text-white no-underline" href="/" aria-label="Raithanna home">
            <svg
              aria-hidden="true"
              className="h-9 w-9 text-[#c8a951]"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path d="M20 3 35 11.5v17L20 37 5 28.5v-17L20 3Z" stroke="currentColor" strokeWidth="2" />
              <path d="M13 24c0-7 5-12 15-12-1 10-6 15-13 15m-2-9 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold tracking-wide">RAITHANNA</span>
          </a>
          <div className="mt-4 space-y-2 text-xs text-white/85">
            <p>☎ <a className="hover:text-[#c8a951]" href="tel:+919876543210">+91 98765 43210</a></p>
            <p>✉ <a className="hover:text-[#c8a951]" href="mailto:support@raithanna.com">support@raithanna.com</a></p>
          </div>
          <div className="mt-4 flex gap-3 text-xs font-semibold text-white/80" aria-label="Social media">
            <a className="hover:text-[#c8a951]" href="https://facebook.com" aria-label="Facebook">f</a>
            <a className="hover:text-[#c8a951]" href="https://x.com" aria-label="X">𝕏</a>
            <a className="hover:text-[#c8a951]" href="https://instagram.com" aria-label="Instagram">◎</a>
            <a className="hover:text-[#c8a951]" href="https://youtube.com" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold">Quick Links</h2>
          <ul className="space-y-2 text-xs text-white/75">
            {quickLinks.map(([label, href]) => (
              <li key={label}>
                <a className="transition-colors hover:text-white" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold">Government Schemes</h2>
          <ul className="space-y-2 text-xs text-white/75">
            {schemeLinks.map((label) => (
              <li key={label}>
                <a className="transition-colors hover:text-white" href="/schemes">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold">Get the App</h2>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            <button
              className="flex min-w-[132px] items-center gap-2 rounded-md border border-white/50 bg-black px-2.5 py-1.5 text-left text-white"
              type="button"
              disabled
              title="Coming soon"
            >
              <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#34a853" d="M2.5 2.8c-.3.4-.5.9-.5 1.6v15.2c0 .7.2 1.2.5 1.6l8.4-9.2L2.5 2.8Z" />
                <path fill="#4285f4" d="m13.1 13.2-2.2-1.2 2.2-1.2 5.2-3 2.6 1.5c1.2.7 1.2 1.8 0 2.5l-2.6 1.5-5.2-3Z" />
                <path fill="#fbbc04" d="m2.5 2.8 10.6 6.1-2.2 1.2-8.4-7.3Z" />
                <path fill="#ea4335" d="m2.5 21.2 8.4-9.2 2.2 1.2-10.6 8Z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-[8px] uppercase tracking-wide">Get it on</span>
                <span className="block text-xs font-semibold">Google Play</span>
              </span>
            </button>
            <button
              className="flex min-w-[132px] items-center gap-2 rounded-md border border-white/50 bg-black px-2.5 py-1.5 text-left text-white"
              type="button"
              disabled
              title="Coming soon"
            >
              <svg aria-hidden="true" className="h-5 w-5 shrink-0 fill-white" viewBox="0 0 24 24">
                <path d="M16.4 12.8c0-2 1.6-3 1.7-3.1a3.7 3.7 0 0 0-2.9-1.6c-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7a3.9 3.9 0 0 0-3.3 2c-1.4 2.4-.4 5.9.9 7.8.6.9 1.3 1.9 2.2 1.9.9 0 1.2-.6 2.4-.6s1.5.6 2.5.6 1.5-.9 2.1-1.8c.7-1 1-2 1-2.1-.1 0-2.2-.9-2.2-3.1ZM14.5 6.9a3.7 3.7 0 0 0 .8-2.6 3.8 3.8 0 0 0-2.5 1.3 3.5 3.5 0 0 0-.8 2.5 3.2 3.2 0 0 0 2.5-1.2Z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-[8px] uppercase tracking-wide">Download on the</span>
                <span className="block text-xs font-semibold">App Store</span>
              </span>
            </button>
          </div>
          <p className="mt-2 text-[10px] text-white/50">Coming soon</p>
        </div>
      </div>

      <div className="border-t border-white/15 py-3 text-center text-[10px] text-white/75">
        © 2026 Raithanna. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
