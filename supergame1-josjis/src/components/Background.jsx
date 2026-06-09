import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Background() {

  const [particles, setParticles] = useState([]);

  useEffect(() => {

    const generatedParticles = Array.from({ length: 15 }).map(() => ({
      id: Math.random().toString(36).substring(2, 9), // ID unik
      size: Math.random() * 60 + 20,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      animX: Math.random() * 200 - 100,
      animY: Math.random() * 200 - 100,
      duration: Math.random() * 10 + 10,
    }));
    
    setParticles(generatedParticles);
  }, []); 

  if (particles.length === 0) return <div className="fixed inset-0 z-0 bg-oxigen-dark"></div>;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-oxigen-dark pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-oxigen-light opacity-20 blur-xl"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.startY}%`,
            left: `${p.startX}%`,
          }}
          animate={{
            x: [0, p.animX, 0],
            y: [0, p.animY, 0],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}