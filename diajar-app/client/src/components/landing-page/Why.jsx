export default function Why() {
  return (
    <section
      id="kenapa"
      className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="max-w-4xl">
          {/* Label */}
          <p className="text-sm font-bold tracking-wide text-blue-600">
            KENAPA PLATFORM INI
          </p>

          {/* Heading */}
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#092866] sm:text-5xl">
            Belajar jadi seru, bukan sekadar tugas
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-500">
            Kami membangun ruang belajar yang menyenangkan, terbuka untuk
            siapa saja dari berbagai latar belakang.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Card 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6.75h15v10.5h-15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75V4.5h7.5v2.25M8.25 11.25h7.5M8.25 14.25h4.5"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-extrabold text-[#092866]">
              Tanpa Batas Target
            </h3>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-500">
              Tidak hanya siswa. Siapa saja yang ingin belajar bisa ikut serta.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 transition duration-300 group-hover:bg-amber-500 group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 2.75L4.5 13.25h6.25L10 21.25l9.5-12h-6.25L13 2.75z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-extrabold text-[#092866]">
              Gamifikasi Murni
            </h3>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-500">
              XP & rank membangun motivasi dan peringkat sehingga belajar
              tidak membosankan.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-500 transition duration-300 group-hover:bg-green-500 group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h3l2-5 4 10 2-5h7"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-extrabold text-[#092866]">
              Belajar & Berbagi
            </h3>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-500">
              Sekaligus menjadi Learner saat belajar dan Creator saat berbagi
              ilmu.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition duration-300 group-hover:bg-purple-600 group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.5l7 3v5.25c0 4.55-2.95 7.9-7 9.75-4.05-1.85-7-5.2-7-9.75V6.5l7-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.25 12l1.75 1.75L15 9.75"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-extrabold text-[#092866]">
              Aman & Terjaga
            </h3>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-500">
              Konten dimoderasi admin untuk menjaga kualitas dan kenyamanan.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}