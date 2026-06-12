import { useState, useEffect } from 'react';

export function useMarkdown(filePath) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat file materi markdown.');
        return res.text();
      })
      .then((text) => {
        // Regex untuk memisah string berdasarkan '---' yang berdiri sendiri di satu baris
        const splitSlides = text.split(/\n---\s*\n/);
        setSlides(splitSlides.map(slide => slide.trim()));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filePath]);

  return { slides, loading, error };
}