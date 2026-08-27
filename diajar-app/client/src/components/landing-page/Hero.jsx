import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#06245f] via-[#073b9f] to-[#075bd8] text-white"
    >
      {/* ================= ANIMASI KARTU PROFIL ================= */}
      <style>
        {`
          @keyframes floatingCard {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-12px);
            }
          }

          .hero-profile-card {
            animation: floatingCard 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl"></div>

      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-3xl"></div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}
          <div>

            {/* Status */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-400/20 px-5 py-2 text-sm font-semibold text-blue-100 ring-1 ring-blue-300/20">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>

              Musim (season) sedang aktif
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Belajar, Berkarya,
              <br />
              dan{" "}
              <span className="text-yellow-400">
                Naik Peringkat!
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Kumpulkan{" "}
              <span className="font-bold text-white">
                XP Learner
              </span>{" "}
              saat belajar dan{" "}
              <span className="font-bold text-white">
                XP Creator
              </span>{" "}
              saat berbagi ilmu. Bersaing sehat di leaderboard tiap season —
              karena{" "}
              <span className="italic">
                tidak ada kata terlambat untuk belajar.
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-950/30 transition duration-200 hover:-translate-y-1 hover:bg-blue-500"
              >
                Mulai Belajar Sekarang
              </Link>

              <a
                href="#fitur"
                className="rounded-xl border-2 border-blue-300/50 bg-transparent px-8 py-4 text-base font-bold text-white transition duration-200 hover:-translate-y-1 hover:bg-white/10"
              >
                Jelajahi Fitur
              </a>
            </div>

            {/* XP Information */}
            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">

              {/* +10 XP */}
              <div className="rounded-xl bg-white/10 px-5 py-4 text-center backdrop-blur-sm transition hover:bg-white/15">
                <p className="text-2xl font-extrabold">
                  +10 XP
                </p>

                <p className="mt-1 text-sm text-blue-200">
                  Baca Materi
                </p>
              </div>

              {/* +20 XP */}
              <div className="rounded-xl bg-white/10 px-5 py-4 text-center backdrop-blur-sm transition hover:bg-white/15">
                <p className="text-2xl font-extrabold">
                  +20 XP
                </p>

                <p className="mt-1 text-sm text-blue-200">
                  Upload Materi
                </p>
              </div>

              {/* +30 XP */}
              <div className="rounded-xl bg-white/10 px-5 py-4 text-center backdrop-blur-sm transition hover:bg-white/15">
                <p className="text-2xl font-extrabold">
                  +30 XP
                </p>

                <p className="mt-1 text-sm text-blue-200">
                  Buat Kuis
                </p>
              </div>

            </div>
          </div>

          {/* ================= RIGHT CARD ================= */}
          <div className="flex justify-center lg:justify-end">

            {/* KARTU YANG MENGAMBANG */}
            <div className="hero-profile-card w-full max-w-xl rounded-[28px] bg-white p-7 text-slate-900 shadow-2xl shadow-blue-950/30 sm:p-8">

              {/* Profile Header */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-extrabold text-white">
                    AP
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-[#102d68]">
                      Andi Pratama
                    </h3>

                    <p className="text-sm text-slate-400">
                      Gold • 220 total XP
                    </p>
                  </div>

                </div>

                <span className="text-lg font-medium text-slate-700">
                  GOLD
                </span>

              </div>

              {/* Progress */}
              <div className="mt-8">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-500">
                    Progress peringkat
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    220/500 XP
                  </span>

                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                    style={{ width: "44%" }}
                  ></div>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  280 XP menuju Platinum
                </p>

              </div>

              {/* Statistics */}
              <div className="mt-7 grid grid-cols-3 gap-4">

                {/* Quiz */}
                <div className="rounded-2xl bg-blue-50 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-blue-600">
                    4
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    XP Kuis
                  </p>
                </div>

                {/* Materi */}
                <div className="rounded-2xl bg-yellow-50 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-yellow-500">
                    3
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    XP Materi
                  </p>
                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl bg-blue-600 px-4 py-5 text-center text-white">
                  <p className="text-2xl font-extrabold">
                    #1
                  </p>

                  <p className="mt-1 text-xs font-medium text-blue-100">
                    Leaderboard
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}