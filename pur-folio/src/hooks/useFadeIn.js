import { useState, useEffect } from 'react';

export const useFadeIn = (delay = 0) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Mengembalikan kelas utility Tailwind berdasarkan state aktif
  return isMounted 
    ? 'opacity-100 translate-y-0 transition-all duration-1000 ease-out' 
    : 'opacity-0 translate-y-10 transition-all duration-1000 ease-out';
};