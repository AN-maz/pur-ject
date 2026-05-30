import { useState } from "react"
import { Calendar, Camera, Package, Megaphone, CheckCircle, ChevronDown } from "lucide-react"

import volunteerData from "@/data/volunteerEventData.json"

const iconMap = {
  calendar: Calendar,
  camera: Camera,
  package: Package,
  megaphone: Megaphone,
}

export default function VolunteerEvent() {
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
              <pattern id="vol-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vol-grid)" />
          </svg>
        </div>

        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-ec-red/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <span className="reveal-up inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-md">
            Volunteer Open Recruitment
          </span>

          <h1 className="reveal-up text-3xl font-extrabold text-white md:text-5xl lg:text-6xl" style={{ transitionDelay: "100ms" }}>
            {volunteerData.title}
          </h1>

          <p className="reveal-up mx-auto max-w-2xl text-lg text-gray-300 md:text-xl" style={{ transitionDelay: "200ms" }}>
            {volunteerData.subtitle}
          </p>

          <div className="reveal-up pt-4" style={{ transitionDelay: "300ms" }}>
            <a
              href="#register"
              className="inline-block rounded-lg bg-ec-red px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/30"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          
          {/* Event Details */}
          <div className="reveal-up mb-16 rounded-2xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-ec-blue">Tentang Acara</h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              {volunteerData.description}
            </p>
            
            <div className="grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-ec-blue">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Tanggal Pelaksanaan</p>
                  <p className="font-medium text-gray-900">
                    {new Date(volunteerData.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-ec-red">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Lokasi</p>
                  <p className="font-medium text-gray-900">{volunteerData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="reveal-up mb-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-ec-blue md:text-3xl">Benefits</h2>
              <p className="mt-2 text-gray-500">Apa yang akan kamu dapatkan?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {volunteerData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                  <CheckCircle className="h-6 w-6 shrink-0 text-green-500" />
                  <span className="font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divisions */}
          <div className="reveal-up mb-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-ec-blue md:text-3xl">Divisi yang Dibutuhkan</h2>
              <p className="mt-2 text-gray-500">Pilih divisi yang sesuai dengan minat dan bakatmu.</p>
            </div>

            <div className="space-y-4">
              {volunteerData.divisions.map((div, index) => {
                const IconComp = iconMap[div.icon] || CheckCircle
                const isOpen = openDivision === index

                return (
                  <div key={div.name} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300">
                    <button
                      onClick={() => toggleDivision(index)}
                      className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ec-blue/5 text-ec-blue">
                          <IconComp className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 md:text-xl">{div.name}</h3>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                        <p className="mb-5 text-gray-600">{div.description}</p>
                        
                        <h4 className="mb-3 font-semibold text-ec-blue">Tugas Pokok & Fungsi (Tupoksi):</h4>
                        <ul className="space-y-2">
                          {div.tupoksi.map((task, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ec-red" />
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA / Registration */}
          <div id="register" className="reveal-up rounded-2xl bg-gradient-to-br from-ec-blue to-blue-900 p-8 text-center text-white shadow-xl md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Siap Bergabung?</h2>
            <p className="mb-8 text-gray-300">
              Pendaftaran ditutup pada: <span className="font-bold text-white">
                {new Date(volunteerData.registrationDeadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </p>
            
            <a
              href={volunteerData.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-ec-red px-10 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/30"
            >
              Isi Form Pendaftaran
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
