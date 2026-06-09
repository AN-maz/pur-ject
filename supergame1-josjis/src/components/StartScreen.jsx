import React from 'react';
import { motion } from 'framer-motion';

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#F8F9FA]"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-50" 
        style={{
          backgroundImage: 'linear-gradient(#CBD5E1 2px, transparent 2px), linear-gradient(90deg, #CBD5E1 2px, transparent 2px)',
          backgroundSize: '60px 60px'
        }}
      ></div>

      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center px-6 w-full"
      >

        <img
          src="/splash-screen.png" 
          alt="Supergames Splash Screen"
          className="w-full max-w-2xl drop-shadow-2xl mb-12 hover:scale-105 transition-transform duration-500"
        />
        
        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px #0A2B3E" }}
          onClick={onStart}
          className="px-10 py-4 bg-[#0A2B3E] text-white font-extrabold text-xl md:text-2xl rounded-full border-4 border-[#0A2B3E] shadow-[6px_6px_0px_#FFD93D] hover:shadow-[8px_8px_0px_#FF6B6B] transition-all tracking-wider"
        >
          MULAI EKSPLORASI
        </motion.button>
      </motion.div>
    </motion.div>
  );
}