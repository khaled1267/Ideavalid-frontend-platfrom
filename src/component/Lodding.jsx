
"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent absolute"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-purple-500 border-b-transparent absolute"
        />

        {/* Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.8)]"
        />

      </div>
    </div>
  );
}