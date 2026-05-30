import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"

import newsData from "@/data/newsData.json"

const ITEMS_PER_PAGE = 6

export default function News() {
  // Restore page from sessionStorage if returning from detail
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = sessionStorage.getItem("news-list-page")
    return saved ? parseInt(saved, 10) : 1
  })
  const [filterQuery, setFilterQuery] = useState("")

  // Save current page to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("news-list-page", String(currentPage))
  }, [currentPage])

  // Save scroll position before user navigates away
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("news-list-scroll", String(window.scrollY))
    }
    // Save on every scroll so it's always up to date
    window.addEventListener("scroll", saveScroll)
    return () => window.removeEventListener("scroll", saveScroll)
  }, [])

  // Filter news
  const filteredNews = useMemo(() => {
    if (!filterQuery.trim()) return newsData
    const q = filterQuery.toLowerCase()
    return newsData.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    )
  }, [filterQuery])

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden bg-ec-blue pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="news-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#news-grid)" />
          </svg>
        </div>

        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-ec-red/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-6 text-center">
          <h1 className="reveal-up text-3xl font-extrabold italic text-white md:text-4xl lg:text-5xl">
            Berita & Kegiatan Terbaru
          </h1>
          <p
            className="reveal-up mx-auto max-w-xl text-base text-gray-300 md:text-lg"
            style={{ transitionDelay: "100ms" }}
          >
            Ikuti perkembangan terbaru dan cerita seru dari English Club UTB.
          </p>
        </div>
      </section>

      {/* Filter & News List */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Filter Bar */}
          <div
            className="reveal-up mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            style={{ transitionDelay: "100ms" }}
          >
            <p className="text-sm text-gray-500">
              Halaman <span className="font-bold text-ec-blue">{currentPage}</span> dari{" "}
              <span className="font-bold text-ec-blue">{totalPages || 1}</span>
            </p>

            <input
              type="text"
              placeholder="Filter di halaman ini..."
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-700 shadow-sm outline-none transition-all focus:border-ec-blue/30 focus:ring-2 focus:ring-ec-blue/10 sm:max-w-md"
            />
          </div>

          {/* News Grid */}
          {paginatedNews.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500">
                Tidak ada berita yang ditemukan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedNews.map((post, index) => (
                <article
                  key={post.id}
                  className="reveal-up group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden sm:h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-ec-blue shadow-sm backdrop-blur-sm">
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-ec-blue transition-colors group-hover:text-ec-red">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
                      {post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs text-gray-400">
                        By {post.author}
                      </span>
                      <Link
                        to={`/news/${post.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-ec-blue transition-all duration-300 hover:text-ec-red hover:tracking-wide"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="reveal-up mt-12 flex items-center justify-center gap-2"
              style={{ transitionDelay: "200ms" }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-ec-blue disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-ec-blue text-white shadow-lg"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-ec-blue disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
