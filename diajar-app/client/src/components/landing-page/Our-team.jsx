const team = [
  { initial: "P", name: "Purwa", role: "Frontend & Desain", bg: "bg-primary" },
  { initial: "E", name: "Erlangga", role: "Backend Developer", bg: "bg-navy" },
  { initial: "A", name: "A. (mas Aep)", role: "Data & Analisis", bg: "bg-amber-400" },
  { initial: "Z", name: "Zaid", role: "UI/UX & Dokumentasi", bg: "bg-emerald-400" },
  { initial: "R", name: "Rafi Ridwan", role: "UI/UX & Designer", bg: "bg-rose-400" },
];

export default function OurTeam() {
  return (
    <section id="tim" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Team
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-navy">
            Dibalik LMS Gamifikasi
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Tangan-tangan yang merancang dan membangun platform ini.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {team.map(({ initial, name, role, bg }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:shadow-lg transition"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full ${bg} text-white flex items-center justify-center text-2xl font-extrabold`}
              >
                {initial}
              </div>
              <h3 className="mt-4 font-bold text-navy text-lg">{name}</h3>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}