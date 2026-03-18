import React from 'react';
import { motion } from 'framer-motion';

export default function StartScreen({ onStart }) {
  return (
    <motion.div 
      exit={{ opacity: 0, y: -50, filter: "blur(10px)", transition: { duration: 0.5 } }}
      className="relative z-10 flex items-center justify-center h-screen w-full"
    >
      <div className="absolute w-64 h-64 bg-oxigen-light rounded-full blur-[100px] opacity-30"></div>
      
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 40px rgba(0,81,210,0.8)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="relative z-20 px-12 py-5 bg-white text-oxigen-dark font-black text-3xl rounded-full shadow-[0_0_30px_rgba(0,81,210,0.4)] transition-all tracking-widest"
      >
        START
      </motion.button>
    </motion.div>
  );
}