import { useState, useEffect, useRef } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen masuk ke layar, ubah state menjadi true
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Opsi tambahan: matikan unobserve jika ingin animasi hanya sekali saat di-scroll
          // observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold, // Berapa persen elemen harus terlihat sebelum animasi dipicu (0.1 = 10%)
        rootMargin: "0px 0px -50px 0px" // Memberikan sedikit jeda bottom margin agar animasi terasa natural
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [elementRef, isIntersecting];
};