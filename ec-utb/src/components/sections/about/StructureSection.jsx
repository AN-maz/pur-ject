import { Link } from "react-router-dom"
import { Crown, BookOpen, Megaphone, Wallet, Camera, Users } from "lucide-react"

import structureData from "@/data/structureData.json"

const iconMap = {
  crown: Crown,
  book: BookOpen,
  megaphone: Megaphone,
  wallet: Wallet,
  camera: Camera,
  users: Users,
}

export default function StructureSection() {
  const divisions = structureData.divisions

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="reveal-up mb-14 text-center">
          <h2 className="text-3xl font-extrabold italic text-ec-blue md:text-4xl lg:text-5xl">
            Our Structure
          </h2>
          <p className="mt-4 text-gray-500">
            Meet the teams behind our success.
          </p>
        </div>

        {/* Division Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division, index) => {
            const IconComp = iconMap[division.icon] || Users

            return (
              <Link
                to={`/about/structure/${division.slug}`}
                key={division.id}
                className="reveal-up group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:h-80"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <img
                  src={division.groupPhoto}
                  alt={division.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ec-blue/90 via-ec-blue/50 to-ec-blue/20 transition-opacity duration-500 group-hover:from-ec-blue/95 group-hover:via-ec-blue/60" />

                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Icon Badge */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ec-red shadow-lg">
                    <IconComp className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white md:text-2xl">
                    {division.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-300">
                    {division.description}
                  </p>

                  {/* View Members Link */}
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition-all duration-300 group-hover:text-white group-hover:tracking-wide">
                    View Members
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
