import { Link } from 'react-router-dom'

export default function MaterialCard({ material }) {
  const rating = MaterialCard.fallbackRating(material)

  return (
    <Link
      to={`/materi/${material.slug}`}
      className="group block bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Cover */}
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        {material.cover_image_url ? (
          <img
            src={material.cover_image_url}
            alt={material.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-5xl text-slate-300">📚</span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          {material.category?.name || 'Uncategorized'}
        </span>

        <h3 className="mt-3 text-xl font-bold text-navy group-hover:text-blue-600 transition line-clamp-2">
          {material.title}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-300'}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-slate-400 ml-1">
              ({material.ratings_count || 0})
            </span>
          </div>

          {material.author?.name && (
            <span className="text-xs text-slate-500">
              oleh {material.author.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

MaterialCard.fallbackRating = (m) =>
  m.average_rating != null ? Number(m.average_rating) : 0
