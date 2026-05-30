export default function AboutHeroSection() {
  return (
    <section className="relative flex min-h-[45vh] w-full items-center justify-center overflow-hidden bg-ec-blue pt-20">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-ec-red/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-6 text-center">
        <h1 className="reveal-up text-4xl font-extrabold italic text-white md:text-5xl lg:text-6xl">
          About Us
        </h1>

        <p
          className="reveal-up mx-auto max-w-xl text-base text-gray-300 md:text-lg"
          style={{ transitionDelay: "100ms" }}
        >
          Getting to know deeper about English Club UTB.
        </p>
      </div>
    </section>
  )
}
