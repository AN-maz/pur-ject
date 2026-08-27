import { BookOpen, ClipboardCheck, Trophy, Star, ShieldCheck, LogIn } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Jelajah Materi",
    desc: "Materi berformat Markdown yang rapi, mudah dibaca, dari kreator lain.",
    bg: "bg-blue-50",
    color: "text-primary",
  },
  {
    icon: ClipboardCheck, 
    title: "Kuis & Skor",
    desc: "Uji pemahamanmu lewat kuis dengan batas waktu dan XP maksimal.",
    bg: "bg-amber-50",
    color: "text-amber-500",
  },
  {
    icon: Trophy,
    title: "Leaderboard & Rank",
    desc: "Bersaing tiap season menuju tier Bronze hingga Diamond.",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    icon: Star,
    title: "Rating & Komentar",
    desc: "Beri bintang dan diskusi di kolom komentar setiap materi.",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "Moderasi Konten",
    desc: "Admin menjaga kualitas materi dan kuis dari konten yang tidak relevan.",
    bg: "bg-red-50",
    color: "text-red-500",
  },
  {
    icon: LogIn,
    title: "Masuk Cepat",
    desc: "Login dan daftar sekali klik lewat akun Google Anda.",
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-24" style={{ background: "#f1f5f9" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Fitur
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-navy">
            Semua yang kamu butuhkan untuk berkembang
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Dari belajar mandiri hingga uji pemahaman, semuanya dalam satu platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map(({ icon: Icon, title, desc, bg, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                <Icon size={24} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-bold text-navy text-lg">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 