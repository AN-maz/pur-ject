import structureData from "@/data/structureData.json"

export default function AdvisorsSection() {
  const advisors = structureData.pembina

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      {/* Decorative dots top-right */}
      <div className="absolute top-8 right-8 hidden opacity-20 lg:block">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-ec-blue" />
          ))}
        </div>
      </div>

      {/* Decorative dots bottom-left */}
      <div className="absolute bottom-8 left-8 hidden opacity-20 lg:block">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-ec-blue" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <div className="reveal-up mb-16 text-center">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-ec-red uppercase">
            The Guiding Lights
          </p>
          <h2 className="text-3xl font-extrabold italic text-ec-blue md:text-4xl lg:text-5xl">
            Board of Advisors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Great leaders inspire greatness in others. Meet the mentors who guide
            our vision and growth.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
          {advisors.map((advisor, index) => (
            <div
              key={advisor.name}
              className="reveal-up flex flex-col items-center text-center"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Photo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-blue-100 to-blue-200/50" />
                <img
                  src={advisor.photo}
                  alt={advisor.name}
                  className="relative z-10 h-48 w-48 rounded-full object-cover object-top shadow-lg md:h-56 md:w-56"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-ec-blue md:text-2xl">
                {advisor.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-ec-red">
                {advisor.role}
              </p>

              {/* Quote */}
              <div className="relative mt-6 max-w-sm">
                <span className="absolute -top-3 -left-4 text-4xl font-bold text-ec-red/20">
                  &#x201C;
                </span>
                <p className="text-sm leading-relaxed text-gray-500 italic">
                  &ldquo;{advisor.quote}&rdquo;
                </p>
                <span className="absolute -right-4 -bottom-2 text-4xl font-bold text-ec-red/20">
                  &#x201D;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
