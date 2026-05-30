import buildingImage from "@/assets/images/utb-gedung-1.png"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-ec-blue">

      {/* Grid Background */}
      <div id="hero-bg" className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
          />
        </svg>
      </div>

      {/* Building Image */}
      <div
        className="reveal-up pointer-events-none absolute top-1/2 left-1/2 z-10 h-[50vh] w-[80%] -translate-x-1/2 -translate-y-1/2 sm:h-[60vh] sm:w-[70%] lg:absolute lg:top-0 lg:right-0 lg:left-auto lg:z-20 lg:h-full lg:w-1/2 lg:translate-x-0 lg:translate-y-0"
        style={{ transitionDelay: "300ms" }}
      >
        <img
          src={buildingImage}
          alt="Gedung UTB"
          className="h-full w-full object-contain"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 100%, black 70%, transparent)",
            maskImage: "linear-gradient(to right, black 100%, black 70%, transparent)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        id="hero-content"
        className="relative z-30 mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-24 sm:px-6 sm:pt-28 lg:items-center lg:px-12 lg:pt-0"
      >
        <div className="flex h-full w-full items-center justify-center lg:w-1/2 lg:justify-start">
          <div className="space-y-4 py-8 text-center sm:space-y-6 sm:py-10 lg:py-20 lg:text-left">

            <div className="reveal-up mx-auto inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm lg:mx-0">
              WELCOME TO EC-UTB
            </div>

            <h1
              className="reveal-up text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ transitionDelay: "100ms" }}
            >
              LEARN TOGETHER <br />
              GROW TO BE
              <span className="text-ec-red"> BETTER</span>
            </h1>

            <p
              className="reveal-up mx-auto max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base lg:mx-0 lg:text-lg"
              style={{ transitionDelay: "200ms" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              eaque ipsum distinctio aut cum dicta vitae esse nemo.
            </p>

            <div
              className="reveal-up flex flex-col justify-center gap-3 pt-6 sm:flex-row sm:gap-4 sm:pt-8 lg:justify-start"
              style={{ transitionDelay: "300ms" }}
            >
              <a
                href="/auth/register"
                className="rounded-lg bg-ec-red px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 sm:px-8 sm:py-3 sm:text-base"
              >
                Join Now
              </a>

              <a
                href="#news"
                className="rounded-lg border-2 border-white bg-transparent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-ec-blue sm:px-8 sm:py-3 sm:text-base"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}