import { Link } from "react-router-dom"
import logo from "@/assets/images/nav-logo_p.png"
import ourTeam from "@/assets/images/our-team.jpg"

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={ourTeam}
            alt="UTB Campus Atmosphere"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-ec-blue/80" />

        <div className="relative z-20 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <h2 className="text-3xl leading-tight font-extrabold text-white md:text-5xl">
            Ready to Speak Up & <br />
            <span className="text-ec-red">Stand Out?</span>
          </h2>

          <p className="text-lg font-light text-gray-200 md:text-xl">
            Don&apos;t let your questions stop you from growing. Reach out to
            us, join the movement, and let&apos;s create something extraordinary
            together at English Club UTB.
          </p>

          <div className="pt-4">
            <a
              href="#contact-info"
              className="inline-block rounded-full bg-ec-red px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700"
            >
              Contact Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact-info"
        className="border-t border-white/10 bg-ec-blue pt-20 pb-10 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo & Description */}
            <div className="space-y-6 lg:col-span-1">
              <img
                src={logo}
                alt="Logo English Club"
                className="w-40"
              />

              <p className="text-sm leading-relaxed text-gray-400">
                The official English Club of Universitas Teknologi Bandung. A
                place to learn, grow, and innovate through language.
              </p>

              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-400 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>

            {/* Partnership */}
            <div className="space-y-4">
              <h3 className="border-l-4 border-ec-red pl-3 text-lg font-bold">
                Partnership
              </h3>

              <p className="text-sm text-gray-400">
                For sponsorship & media partner collaboration.
              </p>

              {/* Contact Card */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Media Partner (Admin)</p>
                  <p className="text-sm font-bold text-white">+62 812-XXXX-XXXX</p>
                </div>
              </div>
            </div>

            {/* Membership */}
            <div className="space-y-4">
              <h3 className="border-l-4 border-ec-red pl-3 text-lg font-bold">
                Membership
              </h3>

              <p className="text-sm text-gray-400">
                Questions about recruitment & HR.
              </p>

              {/* Contact Card */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">HR Division (Person)</p>
                  <p className="text-sm font-bold text-white">+62 898-XXXX-XXXX</p>
                </div>
              </div>
            </div>

            {/* General Inquiry */}
            <div className="space-y-4">
              <h3 className="border-l-4 border-ec-red pl-3 text-lg font-bold">
                General Inquiry
              </h3>

              <p className="text-sm text-gray-400">
                Official correspondence & invite.
              </p>

              {/* Contact Card */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="text-sm font-bold text-white">humas@ec-utb.ac.id</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
            <p>
              © Copyright by 24552011027_Andrian Maulana Dzikwan_TIF RP 23 CNS B. All Rights Reserved.
            </p>

            <p className="mt-2 md:mt-0">
              Designed with <span className="text-ec-red">♥</span> in Bandung.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}