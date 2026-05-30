import ourTeam from "@/assets/images/our-team.jpg"

export default function JourneySection() {
  const stats = [
    { value: "1+", label: "Years Active" },
    { value: "50+", label: "Members" },
    { value: "500+", label: "Amal Jariyah" },
  ]

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-ec-red/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="reveal-up group relative">
            {/* Decorative frame */}
            <div className="absolute top-3 -left-3 -z-10 h-full w-full rounded-2xl border-2 border-ec-blue/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
            <div className="absolute -right-3 -bottom-3 -z-10 h-2/3 w-2/3 rounded-2xl bg-ec-red/10" />

            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={ourTeam}
                alt="English Club UTB Team Photo"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="reveal-up mb-6" style={{ transitionDelay: "100ms" }}>
              <h2 className="text-3xl font-extrabold text-ec-blue md:text-4xl">
                Our Journey
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-ec-red" />
            </div>

            <div
              className="reveal-up space-y-4 text-gray-600"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="leading-relaxed">
                Founded in 2024, English Club UTB started as a small study group of 5
                students who shared a passion for language. Over the years, we have
                evolved into one of the most active student organizations on campus.
              </p>
              <p className="leading-relaxed">
                We believe that English is not just a subject, but a bridge to the
                world. Our philosophy &quot;Learn Together, Grow to be Better&quot; drives every
                activity we do, ensuring that every member feels supported in their
                learning journey.
              </p>
            </div>

            {/* Stats */}
            <div
              className="reveal-up mt-8 grid grid-cols-3 gap-6"
              style={{ transitionDelay: "300ms" }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-ec-red md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
