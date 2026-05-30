import { useParams, Link } from "react-router-dom"
import { useState } from "react"

import newsData from "@/data/newsData.json"

export default function NewsDetail() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)

  const post = newsData.find((n) => n.slug === slug)

  if (!post) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-ec-blue">404</h1>
          <p className="mt-4 text-gray-500">Berita tidak ditemukan.</p>
          <Link
            to="/news"
            className="mt-6 inline-block rounded-lg bg-ec-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
      </section>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = `Baca berita: ${post.title}\n${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <>
      {/* Hero Image */}
      <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-ec-blue pt-20 md:min-h-[55vh]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ec-blue via-ec-blue/60 to-ec-blue/30" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-10 md:px-12">
          {/* Category badge */}
          <span className="mb-3 inline-block rounded-md bg-ec-red px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
            {post.category || "NEWS"}
          </span>

          <h1 className="text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
            <span>
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.author || "Admin"}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          {/* Back Link */}
          <Link
            to="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-ec-blue"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Kembali ke Daftar Berita
          </Link>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-6 leading-relaxed text-gray-700"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Divider */}
          <div className="my-10 h-px bg-gray-200" />

          {/* Share Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-ec-blue">
              Bagikan artikel ini:
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  copied
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-200 bg-white text-gray-600 hover:border-ec-blue/30 hover:text-ec-blue"
                }`}
              >
                {copied ? (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tersalin!
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
