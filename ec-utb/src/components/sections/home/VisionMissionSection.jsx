import ourTeam from "@/assets/images/our-team.jpg"

export default function VisionMissionSection() {
  return (
    <section
      id="visi-misi"
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="absolute -bottom-20 -left-20 -z-10 h-96 w-96 rounded-full bg-ec-red/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image */}
          <div className="reveal-up group relative order-last lg:order-first">
            <div className="absolute top-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-ec-blue transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />

            <div className="absolute -right-4 -bottom-4 -z-10 h-2/3 w-2/3 rounded-2xl bg-ec-red/10" />

            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={ourTeam}
                alt="Foto Pengurus English Club"
                className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            {/* Cabinet Badge */}
            <div className="absolute bottom-6 left-6 hidden rounded-lg border-l-4 border-ec-red bg-white/90 px-6 py-3 shadow-lg backdrop-blur md:block">
              <p className="text-lg font-bold text-ec-blue">Cabinet 2025</p>
              <p className="text-sm text-gray-500">Synergy &amp; Innovation</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-first lg:order-last">

            <div
              className="reveal-up mb-8"
              style={{ transitionDelay: "100ms" }}
            >
              <h4 className="mb-2 font-bold tracking-wider text-ec-red uppercase">
                Our Goals
              </h4>

              <h2 className="text-3xl leading-tight font-extrabold text-ec-blue md:text-4xl">
                Building a Community of <br />
                <span className="bg-gradient-to-r from-ec-blue to-ec-red bg-clip-text text-transparent">
                  Future Leaders
                </span>
              </h2>
            </div>

            <div className="space-y-8">

              {/* Vision */}
              <div
                className="reveal-up relative border-l-4 border-ec-blue pl-8"
                style={{ transitionDelay: "200ms" }}
              >
                <h3 className="mb-2 text-xl font-bold text-ec-blue">
                  Our Vision
                </h3>

                <p className="text-justify leading-relaxed text-gray-600">
                  Menjadikan English Club sebagai wadah utama pengembangan
                  kemampuan bahasa Inggris yang inklusif, inovatif, dan berdaya
                  saing global bagi seluruh mahasiswa Universitas Teknologi
                  Bandung.
                </p>
              </div>

              {/* Mission */}
              <div className="relative">
                <h3
                  className="reveal-up mb-4 flex items-center text-xl font-bold text-ec-blue"
                  style={{ transitionDelay: "300ms" }}
                >
                  <span className="mr-3 h-1 w-8 rounded-full bg-ec-red" />
                  Our Mission
                </h3>

                <ul className="space-y-4">
                  <li
                    className="reveal-up group flex items-start"
                    style={{ transitionDelay: "400ms" }}
                  >
                    <div className="mt-1 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 transition-colors duration-300 group-hover:bg-ec-blue">
                      <span className="text-sm font-bold text-ec-blue group-hover:text-white">
                        1
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Menyediakan program pembelajaran bahasa Inggris yang
                      kreatif dan menyenangkan.
                    </p>
                  </li>

                  <li
                    className="reveal-up group flex items-start"
                    style={{ transitionDelay: "500ms" }}
                  >
                    <div className="mt-1 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 transition-colors duration-300 group-hover:bg-ec-blue">
                      <span className="text-sm font-bold text-ec-blue group-hover:text-white">
                        2
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Membangun jejaring antar anggota untuk kolaborasi dan
                      pertukaran budaya.
                    </p>
                  </li>

                  <li
                    className="reveal-up group flex items-start"
                    style={{ transitionDelay: "600ms" }}
                  >
                    <div className="mt-1 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 transition-colors duration-300 group-hover:bg-ec-blue">
                      <span className="text-sm font-bold text-ec-blue group-hover:text-white">
                        3
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Memfasilitasi anggota untuk berkompetisi dalam ajang debat
                      dan pidato bahasa Inggris.
                    </p>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}