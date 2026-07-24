import React, { useEffect } from 'react'

const COLORS = ['#39ff5a', '#20c997', '#ffd700', '#ff6b6b', '#6c5ce7', '#00d4ff']

export default function Confetti({ active }) {
  useEffect(() => {
    if (!active) return
  }, [active])

  if (!active) return null

  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 1.8 + Math.random() * 2.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 100,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-10px) rotate(0deg)  scale(1);   opacity: 1; }
          50%  { transform: translateY(50vh) rotate(360deg) scale(1.2); opacity: 0.9; }
          100% { transform: translateY(100vh) rotate(720deg) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}