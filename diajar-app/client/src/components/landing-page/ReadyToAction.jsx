import { Link } from "react-router-dom";

export default function ReadyToAction() {
  return (
    <section className="py-20 px-6">
      <div
        className="max-w-5xl mx-auto rounded-3xl text-center text-white p-10 md:p-16"
        style={{ background: "linear-gradient(135deg,#001A57,#0051D2)" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Siap naik peringkat?
        </h2>
        <p className="mt-4 text-white/70 max-w-xl mx-auto">
          Mulai menabung XP hari ini. Siapa tahu di season berikutnya kamu di
          puncak leaderboard.
        </p>
        <Link
          to="/auth"
          className="mt-8 inline-block bg-white text-navy font-bold px-8 py-4 rounded-xl transition hover:bg-blue-50 shadow-xl"
        >
          Masuk & Mulai Belajar
        </Link>
      </div>
    </section>
  );
}