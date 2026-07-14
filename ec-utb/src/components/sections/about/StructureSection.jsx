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

const StructureCard = ({ division, index, isTopman = false }) => {
  const IconComp = iconMap[division.icon] || Users

  return (
    <Link
      to={`/about/structure/${division.slug}`}
      className={`reveal-up group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-ec-blue to-[#0e2a5c] shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-ec-blue/30 animate-float ${
        isTopman ? "min-h-[280px] p-8 md:p-12" : "min-h-[280px] p-8"
      }`}
      style={{
        animationDelay: `${index * 0.2}s`,
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {/* Ornamen Background Abstrak */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-700 group-hover:bg-white/10" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-ec-red/10 blur-3xl transition-all duration-700 group-hover:bg-ec-red/20" />

      <div className="relative z-10">
        {/* Logo / Ikon Badge */}
        <div
          className={`mb-6 flex items-center justify-center rounded-xl bg-ec-red shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            isTopman ? "h-16 w-16" : "h-14 w-14"
          }`}
        >
          <IconComp className={`text-white ${isTopman ? "h-8 w-8" : "h-6 w-6"}`} />
        </div>

        <h3
          className={`font-extrabold text-white ${
            isTopman ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {division.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          {division.description}
        </p>
      </div>

      {/* View Members Link */}
      <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-white/70 transition-all duration-300 group-hover:text-white group-hover:tracking-wide">
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
      </div>
    </Link>
  )
}

export default function StructureSection() {
  const divisions = structureData.divisions

  const topManagement = divisions.find(
    (div) => div.slug === "topman" || div.name.toLowerCase().includes("topman")
  )

  const otherDivisions = divisions.filter((div) => div !== topManagement)

  return (
    <section className="relative bg-white py-16 md:py-24">
      {/* Definisi keyframes untuk Idle Animation (Floating) */}
      <style>{`
        @keyframes float-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float-idle 5s ease-in-out infinite;
        }
        /* Menghentikan animasi idle saat hover agar efek hover dari tailwind tetap berjalan mulus */
        .animate-float:hover {
          animation-play-state: paused;
          transform: translateY(-8px);
        }
      `}</style>

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

        {/* Hierarki: Top Management di posisi paling atas */}
        {topManagement && (
          <div className="mx-auto mb-8 max-w-3xl">
            <StructureCard division={topManagement} index={0} isTopman={true} />
          </div>
        )}

        {/* Hierarki: Divisi lainnya dalam bentuk Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherDivisions.map((division, index) => (
            <StructureCard
              key={division.id}
              division={division}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}