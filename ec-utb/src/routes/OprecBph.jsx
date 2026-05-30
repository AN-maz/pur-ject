import { useState } from "react"
import { CheckCircle, ChevronDown, Crown, BookOpen, Users, Megaphone } from "lucide-react"

import oprecData from "@/data/oprecBphData.json"

const iconMap = {
  crown: Crown,
  book: BookOpen,
  users: Users,
  megaphone: Megaphone,
}

export default function OprecBph() {
  const [openDivision, setOpenDivision] = useState(null)

  const toggleDivision = (index) => {
    if (openDivision === index) {
      setOpenDivision(null)
    } else {
      setOpenDivision(index)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden bg-ec-blue pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="oprec-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#oprec-grid)" />
          </svg>
        </div>

        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-ec-red/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <span className="reveal-up inline-block rounded-full border border-ec-red/50 bg-ec-red/20 px-4 py-1.5 text-sm font-bold tracking-wider text-white uppercase backdrop-blur-md">
            We Are Hiring
          </span>

          <h1 className="reveal-up text-3xl font-extrabold text-white md:text-5xl lg:text-6xl" style={{ transitionDelay: "100ms" }}>
            {oprecData.title}
          </h1>

          <p className="reveal-up mx-auto max-w-2xl text-lg text-gray-300 md:text-xl" style={{ transitionDelay: "200ms" }}>
            {oprecData.subtitle}
          </p>

          <div className="reveal-up pt-4" style={{ transitionDelay: "300ms" }}>
            <a
              href="#register"
              className="inline-block rounded-lg bg-ec-red px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/30"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          
          {/* Intro */}
          <div className="reveal-up mb-16 text-center md:px-10">
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
              {oprecData.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="reveal-up mb-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-ec-blue md:text-3xl">Benefits of Joining BPH</h2>
              <p className="mt-2 text-gray-500">Kembangkan potensimu bersama kami.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {oprecData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-ec-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divisions */}
          <div className="reveal-up mb-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-ec-blue md:text-3xl">Pilihan Divisi</h2>
              <p className="mt-2 text-gray-500">Temukan posisi yang paling cocok dengan passion kamu.</p>
            </div>

            <div className="space-y-4">
              {oprecData.divisions.map((div, index) => {
                const IconComp = iconMap[div.icon] || CheckCircle
                const isOpen = openDivision === index

                return (
                  <div key={div.name} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300">
                    <button
                      onClick={() => toggleDivision(index)}
                      className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ec-red/10 text-ec-red">
                          <IconComp className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 md:text-xl">{div.name}</h3>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                          {/* Tupoksi */}
                          <div>
                            <h4 className="mb-3 font-bold text-ec-blue">Tupoksi:</h4>
                            <ul className="space-y-2">
                              {div.tupoksi.map((task, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                                  <span className="text-sm text-gray-600">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Suits You If */}
                          <div className="rounded-xl bg-blue-50/80 p-5">
                            <h4 className="mb-3 flex items-center gap-2 font-bold text-ec-blue">
                              <span className="text-xl">✨</span> Cocok buat kamu yang:
                            </h4>
                            <ul className="space-y-3">
                              {div.suitsYouIf.map((point, i) => (
                                <li key={i} className="text-sm font-medium text-gray-700 italic">
                                  "{point}"
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA / Registration */}
          <div id="register" className="reveal-up overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
            <div className="bg-ec-blue py-6 text-center">
              <h2 className="text-2xl font-bold text-white">Join the Team!</h2>
            </div>
            <div className="p-8 text-center md:p-10">
              <p className="mb-8 text-lg text-gray-600">
                Jangan lewatkan kesempatan ini. Batas akhir pendaftaran:<br/>
                <span className="mt-2 block text-xl font-bold text-ec-red">
                  {new Date(oprecData.registrationDeadline).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </p>
              
              <a
                href={oprecData.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-ec-red px-10 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/30"
              >
                Isi Form Pendaftaran BPH
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
