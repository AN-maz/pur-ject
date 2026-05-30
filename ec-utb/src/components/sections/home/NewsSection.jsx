import { Link } from "react-router-dom"

import newsData from "@/data/newsData.json"

export default function NewsSection() {
  // Show only latest 3 news on home
  const latestNews = newsData.slice(0, 3)

  return (
    <section
      id="news"
      className="bg-gray-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="reveal-up mb-12 space-y-3 text-center sm:mb-16 sm:space-y-4">
          <h2 className="text-2xl font-extrabold text-ec-blue sm:text-3xl md:text-4xl">
            LATEST <span className="text-ec-red">UPDATES</span>
          </h2>

          <div className="mx-auto h-1 w-20 rounded-full bg-ec-red sm:w-24" />

          <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
            Stay connected with our latest activities, announcements, and
            articles.
          </p>
        </div>

        {/* News Grid */}
        {latestNews.length === 0 ? (
          <div className="reveal-up py-8 text-center sm:py-10">
            <p className="text-base text-gray-500 sm:text-lg">
              Belum ada berita terbaru saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {latestNews.map((post, index) => (
              <article
                key={post.id}
                className="reveal-up group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-ec-blue shadow-sm backdrop-blur-sm">
                    {new Date(post.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-ec-blue transition-colors group-hover:text-ec-red">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {post.content.length > 100
                      ? post.content.substring(0, 100) + "..."
                      : post.content}
                  </p>

                  <Link
                    to={`/news/${post.slug}`}
                    className="inline-flex items-center font-semibold text-ec-red transition-all duration-300 hover:tracking-wide"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
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
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div
          className="reveal-up mt-8 text-center"
          style={{ transitionDelay: "200ms" }}
        >
          <Link
            to="/news"
            className="inline-block rounded-lg border border-ec-blue px-6 py-3 font-semibold text-ec-blue transition-colors hover:bg-ec-blue hover:text-white"
          >
            Lihat Semua Berita →
          </Link>
        </div>
      </div>
    </section>
  )
}