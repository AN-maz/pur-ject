import { useState, useEffect } from 'react'
import { parseQuizSlide, isQuizSlide } from '../utils/parser'

export function useMarkdown(filePath) {
  const [slides, setSlides] = useState([])
  const [slideTypes, setSlideTypes] = useState([])
  const [quizData, setQuizData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat file materi markdown.')
        return res.text()
      })
      .then((text) => {
        const splitSlides = text.split(/\n---\s*\n/).map(s => s.trim()).filter(Boolean)
        const types = splitSlides.map(s => isQuizSlide(s) ? 'quiz' : 'content')
        const quizzes = splitSlides.map(s => isQuizSlide(s) ? parseQuizSlide(s) : null)

        setSlides(splitSlides)
        setSlideTypes(types)
        setQuizData(quizzes)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [filePath])

  return { slides, slideTypes, quizData, loading, error }
}