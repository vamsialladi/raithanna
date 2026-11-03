import { useEffect, useState } from 'react'
import cropDiseaseImage from '../images/crop deases.png'
import agriculturalMachineryImage from '../images/Agricultural Machinery.png'
import farmLabourImage from '../images/FarmLabour.png'
import marketPricesImage from '../images/market.png'
import seedsCropProductsImage from '../images/Seeds.png'
import insurance from '../images/Insurance.png'
import groupImage from '../images/groupmeeting.png'
import buying from '../images/buy.png'

const backgroundImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=2200&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=2200&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2200&q=80&fm=jpg',
]

const services = [
  {
    number: '01',
    category: 'CROP SUPPORT',
    title: 'Crop Disease Diagnosis',
    description:
      'Upload crop photos and request help identifying crop diseases and finding suitable agricultural guidance.',
    image: cropDiseaseImage,
    imageAlt: 'Farmer inspecting healthy green crops',
    page: 'Page 14',
    href: '/services',
  },
  {
    number: '02',
    category: 'ENGINEERING',
    title: 'Agricultural Machinery',
    description:
      'Explore agricultural machines and equipment, find products, and submit enquiries to suppliers.',
    image: agriculturalMachineryImage,
    imageAlt: 'Agricultural machinery working in a field',
    page: 'Page 18',
    href: '/services',
  },
  {
    number: '03',
    category: 'MANPOWER',
    title: 'Farm Labour Connect',
    description:
      'Connect farmers with skilled and unskilled workers, daily labour teams and agricultural consultants.',
    image: farmLabourImage,
    imageAlt: 'Farm workers tending crops in a field',
    page: 'Page 17',
    href: '/services',
  },
  {
    number: '04',
    category: 'MARKETING',
    title: 'Market Prices & Storage',
    description:
      'Explore crop market prices, nearby markets, cold storage facilities and buy-back opportunities.',
    image: marketPricesImage,
    imageAlt: 'Fresh produce stored for market distribution',
    page: 'Page 20',
    href: '/services',
  },
  {
    number: '05',
    category: 'FARM INPUTS',
    title: 'Seeds & Crop Products',
    description:
      'Find agricultural products, seeds, pesticides, organic products and relevant suppliers.',
    image: seedsCropProductsImage,
    imageAlt: 'Agricultural field with crops and farm supplies',
    page: 'Pages 8, 16 and 21',
    href: '/services',
  },
  {
    number: '06',
    category: 'FARM GUIDANCE',
    title: 'Agriculture Advisory',
    description:
      'Request farming guidance, crop planning support, training and advice on agricultural practices.',
    image: insurance,
    imageAlt: 'Farmer receiving advice in a crop field',
    page: 'Pages 5, 10 and 13',
    href: '/services',
  },
  {
    number: '07',
    category: 'FARMER PROTECTION',
    title: 'Insurance & Government Schemes',
    description:
      'Explore agriculture schemes, insurance information, eligibility details and claim assistance.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80&fm=jpg',
    imageAlt: 'Farmer standing among growing crops',
    page: 'Page 19',
    href: '/schemes',
  },
  {
    number: '08',
    category: 'SUSTAINABLE FARMING',
    title: 'Organic Farming',
    description:
      'Learn about organic farming methods, available services and organic certification support.',
    image: backgroundImages[2],
    imageAlt: 'Lush green crops growing using sustainable methods',
    page: 'Pages 5, 6 and 21',
    href: '/services',
  },
  {
    number: '09',
    category: 'SOIL & WATER',
    title: 'Soil Testing & Water Treatment',
    description:
      'Request soil testing and explore water treatment services to support farming preparation.',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80&fm=jpg',
    imageAlt: 'Farmer working with soil in a cultivated field',
    page: 'Pages 8 and 21',
    href: '/services',
  },
  {
    number: '10',
    category: 'FARM MANAGEMENT',
    title: 'Crop Planning & Monitoring',
    description:
      'Organize crop activities, plan farming projects, track progress and request continuous support.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80&fm=jpg',
    imageAlt: 'Farmer monitoring crops in a green field',
    page: 'Pages 9–10',
    href: '/services',
  },
  {
    number: '11',
    category: 'BUYERS & SELLERS',
    title: 'Buy-Back & Market Connections',
    description:
      'Connect farmers with buyers, marketing companies and potential crop-selling opportunities.',
    image: buying,
    imageAlt: 'Fresh farm produce ready to be sold at market',
    page: 'Pages 6, 13 and 20',
    href: '/services',
  },
  {
    number: '12',
    category: 'FARMER COMMUNITY',
    title: 'Farmer Groups & Training',
    description:
      'Connect with farming communities, participate in discussions and access agricultural training information.',
    image: groupImage,
    imageAlt: 'Agricultural community and farmland',
    page: 'Pages 5–7',
    href: '/services',
  },
]

function LandingPage() {
  const [slides, setSlides] = useState({
    images: backgroundImages.slice(0, 2),
    activeLayer: 0,
    nextImage: 2,
  })
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSlides((current) => {
        const incomingLayer = 1 - current.activeLayer
        const images = [...current.images]
        images[incomingLayer] = backgroundImages[current.nextImage]

        return {
          images,
          activeLayer: incomingLayer,
          nextImage: (current.nextImage + 1) % backgroundImages.length,
        }
      })
    }, 6500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <main>
      <section className="relative flex min-h-[min(620px,calc(100vh-76px))] items-center overflow-hidden bg-[#23492d] max-[760px]:min-h-[520px]">
        {slides.images.map((image, index) => (
          <img
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              slides.activeLayer === index ? 'opacity-100' : 'opacity-0'
            }`}
            key={index}
            src={image}
            alt=""
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f1df]/90 via-[#e6e3d4]/55 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1200px] px-8 py-20 max-[760px]:px-6">
          <div className="max-w-[620px]">
            <h1 className="text-4xl font-bold leading-[1.14] tracking-tight sm:text-5xl">
              <span className="text-[#064e32]">Building a Smarter</span>
              <span className="block text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.65)]">
                Future for Agriculture
              </span>
            </h1>
            <p className="mt-5 max-w-[520px] text-lg font-medium leading-relaxed text-white sm:text-xl">
              A brighter future for agriculture through innovation and technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#16894f] px-5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#117541]"
                href="/services"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full bg-[#f5f8f6] px-6 py-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Easy to Use',
              icon: (
                <>
                  <path d="M12 20v-8" strokeWidth="2.4" />
                  <path d="M12 14c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z" fill="currentColor" stroke="none" />
                  <path d="M12 17c0-4 2.3-6.5 7-7-0.2 4.5-2.5 7-7 7Z" fill="currentColor" stroke="none" />
                </>
              ),
            },
            {
              label: 'Farmer Support',
              icon: (
                <>
                  <path d="M4 13v-2a8 8 0 0 1 16 0v2" strokeWidth="2.6" />
                  <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4Z" fill="currentColor" strokeWidth="1.5" />
                  <path d="M17 19a5 5 0 0 1-5 2" strokeWidth="2" />
                </>
              ),
            },
            {
              label: 'Trusted Services',
              icon: (
                <>
                  <path d="m12 3 7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" fill="currentColor" stroke="none" />
                  <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2.2" />
                </>
              ),
            },
            {
              label: 'Government Schemes Information',
              icon: (
                <>
                  <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
                  <text x="12" y="16.5" textAnchor="middle" fill="white" stroke="none" fontSize="13" fontWeight="700">₹</text>
                </>
              ),
            },
          ].map(({ label, icon }) => (
            <article
              className="group flex min-h-[76px] items-center gap-3 rounded-2xl border border-[#dce9d8] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(27,72,43,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#9fc99f] hover:shadow-[0_10px_24px_rgba(27,72,43,0.16)] sm:px-5"
              key={label}
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-[#e1efdc] bg-[#eef8e9] text-[#218d43] shadow-[0_3px_10px_rgba(27,72,43,0.12)] transition-transform duration-200 group-hover:scale-105">
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon}
                </svg>
              </span>
              <h2 className="text-sm font-bold leading-tight text-[#26352a]">
                {label}
              </h2>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8f6] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-9 max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#39895b]">
              What we offer
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#183b27] sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#657368]">
              Innovative digital solutions designed to maximize yield,
              efficiency, and market reach for farmers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                className="group flex flex-col overflow-hidden rounded-lg border border-[#dce2de] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(27,72,43,0.12)]"
                key={service.number}
              >
                <div className="h-36 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#16894f]">
                      {service.number} · {service.category}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#183b27]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-[1.55] text-[#4f5c53]">
                    {service.description}
                  </p>
                  <p className="mt-2 text-[10px] text-[#89928b]">PDF: {service.page}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefbfc] via-white to-[#f2fae9] px-6 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-[#d6f1dc]/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-24 h-40 w-40 rounded-full bg-[#d9f4f4]/60 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="hidden h-[2px] w-12 bg-[#55a861] sm:block" />
              <svg
                aria-hidden="true"
                className="h-7 w-7 shrink-0 text-[#39895b]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z" />
                <path d="M3 21c3-6 7-9 13-13" />
              </svg>
              <h2 className="text-2xl font-bold text-[#12452e] sm:text-4xl">
                How Raithanna Helps Farmers
              </h2>
              <svg
                aria-hidden="true"
                className="h-7 w-7 shrink-0 -scale-x-100 text-[#39895b]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z" />
                <path d="M3 21c3-6 7-9 13-13" />
              </svg>
              <span className="hidden h-[2px] w-12 bg-[#55a861] sm:block" />
            </div>
            <p className="mt-4 text-base leading-7 text-[#33463b] sm:text-lg">
              Our Raithanna portal connects farmers with the right services,
              vendors, and support at every step of their farming journey.
            </p>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-5">
            <article className="grid items-center gap-5 sm:grid-cols-[minmax(160px,1fr)_1fr]">
              <div className="relative mx-auto aspect-square w-full max-w-[250px] overflow-hidden rounded-full border-[8px] border-white shadow-[0_8px_24px_rgba(27,72,43,0.16)]">
                <img
                  className="h-full w-full object-cover"
                  src={cropDiseaseImage}
                  alt="Farmer using a phone to inspect crops"
                  loading="lazy"
                />
                <span className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#17844b] text-xl text-white shadow-lg" aria-hidden="true">
                  ♙
                </span>
              </div>
              <div>
                <span className="inline-flex h-12 min-w-16 items-center justify-center rounded-xl bg-[#218d43] px-3 text-2xl font-bold text-white shadow-md">
                  01
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-[#12452e]">
                  Register &amp;
                  <br />
                  Set Location
                </h3>
                <p className="mt-3 leading-6 text-[#33463b]">
                  Register your profile, provide your details and set your
                  farming location.
                </p>
              </div>
            </article>

            <svg
              aria-hidden="true"
              className="mx-auto hidden h-9 w-16 text-[#32a34a] lg:block"
              viewBox="0 0 64 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 5"
            >
              <path d="M2 12h54m-9-9 9 9-9 9" />
            </svg>

            <article className="grid items-center gap-5 sm:grid-cols-[minmax(180px,1fr)_1fr]">
              <div className="mx-auto w-full max-w-[250px] rounded-[30px] border-[7px] border-[#173e35] bg-white p-2 shadow-[0_8px_24px_rgba(27,72,43,0.18)]">
                <div className="flex h-10 items-center justify-between rounded-t-[18px] bg-[#16834a] px-3 text-xs font-semibold text-white">
                  <span>◈ Raithanna</span>
                  <span aria-hidden="true">☰</span>
                </div>
                <div className="p-3">
                  <p className="mb-3 text-sm font-bold text-[#183b27]">Our Services</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['🌱', 'Seeds'],
                      ['🚜', 'Machinery'],
                      ['👥', 'Manpower'],
                      ['🏪', 'Marketing'],
                      ['🛡️', 'Insurance'],
                      ['📋', 'Schemes'],
                    ].map(([icon, label]) => (
                      <div
                        className="flex min-h-[58px] flex-col items-center justify-center rounded-xl bg-[#f0f7f2] text-center"
                        key={label}
                      >
                        <span className="text-xl" aria-hidden="true">{icon}</span>
                        <span className="mt-1 text-[10px] font-medium text-[#254333]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-flex h-12 min-w-16 items-center justify-center rounded-xl bg-[#218d43] px-3 text-2xl font-bold text-white shadow-md">
                  02
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-[#12452e]">
                  Choose
                  <br />
                  Service
                </h3>
                <p className="mt-3 leading-6 text-[#33463b]">
                  Select services like seeds, machinery, labour, insurance,
                  market support and more.
                </p>
              </div>
            </article>

            <svg
              aria-hidden="true"
              className="mx-auto hidden h-9 w-16 text-[#32a34a] lg:block"
              viewBox="0 0 64 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 5"
            >
              <path d="M2 12h54m-9-9 9 9-9 9" />
            </svg>

            <article className="grid items-center gap-5 sm:grid-cols-[minmax(160px,1fr)_1fr]">
              <div className="relative mx-auto aspect-square w-full max-w-[250px] overflow-hidden rounded-full border-[8px] border-white shadow-[0_8px_24px_rgba(27,72,43,0.16)]">
                <img
                  className="h-full w-full object-cover"
                  src={agriculturalMachineryImage}
                  alt="Tractor working in a farm field"
                  loading="lazy"
                />
                <span className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#17844b] text-xl text-white shadow-lg" aria-hidden="true">
                  ✓
                </span>
              </div>
              <div>
                <span className="inline-flex h-12 min-w-16 items-center justify-center rounded-xl bg-[#218d43] px-3 text-2xl font-bold text-white shadow-md">
                  03
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-[#12452e]">
                  Get Support &amp;
                  <br />
                  Maximize Yield
                </h3>
                <p className="mt-3 leading-6 text-[#33463b]">
                  Find the right support and services to improve your farm
                  productivity and income.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f2fae9] px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 flex items-center justify-center gap-3">
            <svg aria-hidden="true" className="h-5 w-10 text-[#55a936]" viewBox="0 0 40 20" fill="none">
              <path d="M1 10h14m10 0h14" stroke="currentColor" strokeWidth="1.5" />
              <path d="M17 10c0-5 3-8 9-8-1 6-4 9-9 9m2-6 7 9" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="text-center text-2xl font-bold tracking-tight text-[#183b27] sm:text-3xl">
              Why Choose Raithanna?
            </h2>
            <svg aria-hidden="true" className="h-5 w-10 -scale-x-100 text-[#55a936]" viewBox="0 0 40 20" fill="none">
              <path d="M1 10h14m10 0h14" stroke="currentColor" strokeWidth="1.5" />
              <path d="M17 10c0-5 3-8 9-8-1 6-4 9-9 9m2-6 7 9" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'All Services in One Place',
                icon: (
                  <>
                    <path d="M12 20v-7" />
                    <path d="M12 14c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z" fill="currentColor" />
                    <path d="M12 17c0-4 2.3-6.5 7-7-.2 4.5-2.5 7-7 7Z" fill="currentColor" />
                  </>
                ),
              },
              {
                label: 'Save Time & Effort',
                icon: (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </>
                ),
              },
              {
                label: 'Better Income',
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" fill="currentColor" />
                    <text x="12" y="16.5" textAnchor="middle" fill="white" stroke="none" fontSize="13" fontWeight="700">₹</text>
                  </>
                ),
              },
              {
                label: 'Community Support',
                icon: (
                  <>
                    <circle cx="12" cy="7" r="3" fill="currentColor" />
                    <circle cx="5" cy="9" r="2.5" fill="currentColor" />
                    <circle cx="19" cy="9" r="2.5" fill="currentColor" />
                    <path d="M6 19v-2a6 6 0 0 1 12 0v2H6Zm-5-1v-1a4 4 0 0 1 5-3.9m17 4.9v-1a4 4 0 0 0-5-3.9" fill="currentColor" />
                  </>
                ),
              },
            ].map(({ label, icon }) => (
              <article
                className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#e5e8d8] bg-gradient-to-br from-[#fbfaec] to-[#f6f5e5] px-4 py-3 shadow-[0_2px_5px_rgba(27,72,43,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_18px_rgba(27,72,43,0.12)] sm:px-5"
                key={label}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[#45a82c]">
                  <svg
                    aria-hidden="true"
                    className="h-9 w-9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </span>
                <h3 className="text-sm font-bold leading-tight text-[#26352a]">
                  {label}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage