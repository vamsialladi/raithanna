function LeafIcon() {
  return (
    <svg className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-8 8-16Z" />
      <path d="M4 21c3-5 7-8 12-11" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  )
}

function Landing() {
  return (
    <>
      <section className="relative isolate grid min-h-[min(760px,calc(100svh-78px))] place-items-center overflow-hidden bg-[#e8e8d8]" id="home">
        <div
          className="absolute inset-0 -z-10 scale-[1.015] bg-cover bg-[center_54%]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=88")' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fbfaf6]/65 via-[#fbfaf6]/50 to-[#0d2316]/25" aria-hidden="true" />
        <div className="w-[min(900px,calc(100%-40px))] px-0 py-[82px] pb-[110px] text-center max-sm:py-[65px] max-sm:pb-[100px]">
          <span className="inline-flex items-center gap-[9px] rounded-full border border-[#26734b]/20 bg-[#f2f9ef]/85 px-4 py-[9px] text-xs font-bold tracking-[0.12em] text-[#26734b] uppercase backdrop-blur-md">
            <LeafIcon />
            Growing a better tomorrow
          </span>
          <h1 className="my-6 mb-[17px] text-[clamp(2.7rem,6.3vw,5.4rem)] leading-[0.99] font-extrabold tracking-[-0.07em] text-[#151a25] max-sm:text-[clamp(2.65rem,11vw,4.2rem)]">
            Building a smarter
            <span className="block text-[#0c4228]">future for agriculture</span>
          </h1>
          <p className="mx-auto max-w-[690px] text-[clamp(1rem,1.8vw,1.25rem)] leading-[1.65] text-[#45483f]">
            Raithanna connects landowners, farmers, technology and markets to
            create a more organized and sustainable agricultural ecosystem.
          </p>
          <div className="mt-[29px] flex flex-wrap justify-center gap-[13px]">
            <a className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#bef5d9] px-[22px] text-[0.82rem] font-bold text-white shadow-[0_8px_20px_rgba(11,55,33,0.15)] transition hover:-translate-y-0.5 hover:bg-[#145335] hover:shadow-[0_12px_25px_rgba(11,55,33,0.2)]" href="#services">
              Explore Raithanna <ArrowIcon />
            </a>
            <a className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white/95 px-[22px] text-[0.82rem] font-bold text-[#17241b] shadow-[0_7px_20px_rgba(28,38,28,0.11)] transition hover:-translate-y-0.5 hover:bg-white" href="#about">
              Discover our vision
            </a>
          </div>
        </div>
        <div className="absolute right-[max(5.5%,calc((100%-1280px)/2))] bottom-5 left-[max(5.5%,calc((100%-1280px)/2))] flex items-center justify-between gap-5 text-xs font-semibold text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.4)] max-sm:right-5 max-sm:left-5 max-sm:text-[0.68rem]">
          <span className="inline-flex items-center gap-2"><LeafIcon /> Cultivating the land</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-[#0f3a26]/40 px-3 py-[7px]">Honoring Indian agriculture</span>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1180px,calc(100%-48px))] grid-cols-[1.1fr_0.9fr] items-end gap-[50px] py-[92px] pb-[76px] max-[760px]:grid-cols-1 max-[760px]:gap-[18px] max-[760px]:py-[68px] max-[760px]:pb-[52px]" id="about">
        <div>
          <span className="text-xs leading-[1.4] font-bold tracking-[0.12em] text-[#26734b] uppercase">Rooted in the land. Ready for tomorrow.</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.055em] text-[#17241b]">A stronger future starts with working together.</h2>
        </div>
        <p className="max-w-[465px] text-base leading-[1.8] text-[#656b63]">
          We bring the people and resources behind agriculture closer together,
          helping good ideas grow into lasting opportunity for every farmer.
        </p>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-48px))] scroll-mt-[95px] pt-[30px] pb-[100px] max-[760px]:pb-[68px]" id="services">
        <div className="mb-[30px] flex items-end justify-between gap-[30px] max-[760px]:items-start max-[760px]:flex-col max-[760px]:gap-[17px]">
          <div>
            <span className="text-xs leading-[1.4] font-bold tracking-[0.12em] text-[#26734b] uppercase">The Raithanna ecosystem</span>
            <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.055em] text-[#17241b]">Everything agriculture needs to grow.</h2>
          </div>
          <a className="inline-flex shrink-0 items-center gap-[7px] text-sm font-bold text-[#17613c]" href="#join">Join our community <ArrowIcon /></a>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
          <article className="min-h-[220px] rounded-[18px] border border-[#e8e8df] bg-white p-[26px] max-[760px]:min-h-0">
            <span className="text-xs font-bold tracking-[0.08em] text-[#45906a]">01</span>
            <h3 className="mt-[27px] mb-2 text-[1.2rem] font-semibold tracking-[-0.025em] text-[#17241b] max-[760px]:mt-[18px]">For farmers</h3>
            <p className="text-sm leading-[1.65] text-[#656b63]">Find practical support, useful connections and new ways to reach markets.</p>
          </article>
          <article className="min-h-[220px] rounded-[18px] border border-[#e8e8df] bg-white p-[26px] max-[760px]:min-h-0">
            <span className="text-xs font-bold tracking-[0.08em] text-[#45906a]">02</span>
            <h3 className="mt-[27px] mb-2 text-[1.2rem] font-semibold tracking-[-0.025em] text-[#17241b] max-[760px]:mt-[18px]">For landowners</h3>
            <p className="text-sm leading-[1.65] text-[#656b63]">Connect your land with the people and ideas that help it thrive.</p>
          </article>
          <article className="min-h-[220px] rounded-[18px] border border-[#e8e8df] bg-white p-[26px] max-[760px]:min-h-0">
            <span className="text-xs font-bold tracking-[0.08em] text-[#45906a]">03</span>
            <h3 className="mt-[27px] mb-2 text-[1.2rem] font-semibold tracking-[-0.025em] text-[#17241b] max-[760px]:mt-[18px]">For partners</h3>
            <p className="text-sm leading-[1.65] text-[#656b63]">Bring technology, investment and opportunity into a growing ecosystem.</p>
          </article>
        </div>
      </section>

      <section className="flex scroll-mt-[95px] items-center justify-between gap-[30px] bg-[#edf2e8] px-[max(24px,calc((100%-1180px)/2))] py-[53px] max-[760px]:items-start max-[760px]:flex-col max-[760px]:px-6 max-[760px]:py-[42px]" id="join">
        <div>
          <span className="text-xs leading-[1.4] font-bold tracking-[0.12em] text-[#26734b] uppercase">Let’s grow together</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.055em] text-[#17241b]">Be part of what comes next.</h2>
        </div>
        <a className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white/95 px-[22px] text-[0.82rem] font-bold text-[#17241b] shadow-[0_7px_20px_rgba(28,38,28,0.11)] transition hover:-translate-y-0.5 hover:bg-white" href="#contact">
          Get in touch <ArrowIcon />
        </a>
      </section>
    </>
  )
}

export default Landing