import { useState } from 'react'
import { Star } from 'lucide-react'

export default function RatingStars({ rating, size = 5, interactive = false, onRate = null }) {
  const [hoverRating, setHoverRating] = useState(0)
  const displayRating = rating || 0

  if (!interactive) {
    return (
      <div className="flex items-center">
        {[...Array(size)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < displayRating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-300'
            }`}
          />
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-slate-500">
            {Number(rating).toFixed(1)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center">
      {[...Array(size)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <Star
            key={i}
            className={`w-6 h-6 cursor-pointer transition-all ${
              ratingValue <= (hoverRating || displayRating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-300'
            }`}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRate && onRate(ratingValue)}
          />
        )
      })}
    </div>
  )
}
