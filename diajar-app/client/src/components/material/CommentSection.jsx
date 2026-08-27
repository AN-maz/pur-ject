import { useState, useEffect, useRef } from 'react'
import { materialService } from '../../api/materialService'
import { Send } from 'lucide-react'

export default function CommentSection({ materialId, currentUser, onCommentAdded }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const commentsEndRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      setLoading(true)
      const res = await materialService.listComments(materialId)
      if (isMounted && res.success) {
        const commentList = res.data?.comments || res.data || []
        setComments(commentList)
      }
      if (isMounted) setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [materialId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !currentUser) return

    setSubmitting(true)
    const res = await materialService.postComment(materialId, newComment.trim())
    if (res.success) {
      setNewComment('')
      if (res.data?.comment) {
        setComments((prev) => [...prev, res.data.comment])
      }
      onCommentAdded && onCommentAdded()
    }
    setSubmitting(false)
  }

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-navy mb-4">
        Diskusi ({comments.length})
      </h3>

      {!currentUser ? (
        <p className="text-sm text-slate-500 mb-4">
          Masuk untuk berpartisipasi dalam diskusi.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {loading ? (
          <p className="text-sm text-slate-400">Memuat komentar...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-slate-100 pb-3 last:border-0">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {comment.author?.name?.[0] || 'U'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-navy">
                    {comment.author?.name || 'Anonim'}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{comment.comment_text}</p>
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(comment.created_at).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>
    </div>
  )
}
