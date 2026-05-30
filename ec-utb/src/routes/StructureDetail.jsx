import { useParams, Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

import structureData from "@/data/structureData.json"

export default function StructureDetail() {
  const { slug } = useParams()

  const division = structureData.divisions.find((d) => d.slug === slug)

  if (!division) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-ec-blue">404</h1>
          <p className="mt-4 text-gray-500">Divisi tidak ditemukan.</p>
          <Link
            to="/about"
            className="mt-6 inline-block rounded-lg bg-ec-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
          >
            Kembali ke About
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden bg-ec-blue pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="struct-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#struct-grid)" />
          </svg>
        </div>

        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-ec-red/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-6 text-center">
          {/* Back Link */}
          <Link
            to="/about"
            className="reveal-up mb-2 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Structure
          </Link>

          <h1
            className="reveal-up text-3xl font-extrabold text-white md:text-4xl lg:text-5xl"
            style={{ transitionDelay: "100ms" }}
          >
            {division.name}
          </h1>
          <p
            className="reveal-up mx-auto max-w-xl text-base text-gray-300 md:text-lg"
            style={{ transitionDelay: "200ms" }}
          >
            {division.detailDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          {/* Group Photo - Constrained height on mobile */}
          <div
            className="reveal-up mx-auto mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:mb-14 md:max-w-4xl"
            style={{ transitionDelay: "100ms" }}
          >
            <img
              src={division.groupPhoto}
              alt={`${division.name} Group Photo`}
              className="max-h-[300px] w-full object-cover object-top sm:max-h-[400px] md:max-h-[500px] md:object-contain"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Program Kerja */}
            <div className="lg:col-span-4">
              <div
                className="reveal-up sticky top-28 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-md md:shadow-lg"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 h-1 w-full rounded-full bg-ec-red" />
                <h3 className="mt-4 text-xl font-extrabold text-ec-blue">
                  Program Kerja
                </h3>
                <ul className="mt-5 space-y-3">
                  {division.programKerja.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meet the Team */}
            <div className="lg:col-span-8">
              <div className="mb-6 flex items-center justify-between md:mb-8">
                <h2
                  className="reveal-up text-2xl font-extrabold text-ec-blue md:text-3xl"
                  style={{ transitionDelay: "300ms" }}
                >
                  Meet the Team
                </h2>
                <span
                  className="reveal-up rounded-full border border-ec-blue/20 bg-ec-blue/5 px-3 py-1 text-xs font-semibold text-ec-blue md:px-4 md:py-1.5 md:text-sm"
                  style={{ transitionDelay: "350ms" }}
                >
                  {division.members.length} Members
                </span>
              </div>

              <div className="hidden h-px bg-gray-200 md:block" />

              {/* Members Grid - Horizontal on mobile, vertical on desktop */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {division.members.map((member, index) => (
                  <div
                    key={member.name}
                    className="reveal-up group flex overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md md:flex-col md:rounded-2xl"
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    {/* Photo */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-100 md:h-auto md:w-full md:aspect-[3/4]">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-center p-4 md:text-center">
                      <h4 className="text-base font-bold text-ec-blue md:text-lg">
                        {member.name}
                      </h4>
                      <p className="mt-1 text-xs font-bold tracking-wider text-ec-red uppercase md:mt-1.5">
                        {member.role}
                      </p>
                      {member.major && (
                        <p className="mt-1 text-xs text-gray-500 md:mt-2">
                          {member.major}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
