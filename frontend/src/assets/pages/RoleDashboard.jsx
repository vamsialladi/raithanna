function RoleDashboard({ role, description, features }) {
  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f7faf7] px-6 py-12 max-[760px]:min-h-[calc(100vh-110px)] max-[760px]:py-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
          Raithanna dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#183b27] sm:text-4xl">
          Welcome, {role}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">{description}</p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${role} tools`}>
          {features.map((feature) => (
            <article
              className="rounded-2xl border border-[#e1e9e2] bg-white p-6 shadow-sm"
              key={feature.title}
            >
              <h2 className="text-lg font-semibold text-[#214b32]">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default RoleDashboard
