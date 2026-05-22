
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center px-6 overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-blue-500/10 border border-blue-400/20"
      />
      
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-purple-500/10 border border-purple-400/20"
      />

      <div className="max-w-2xl text-center relative z-10">
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-none drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto"
        >
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg shadow-blue-500/20">
              <Home size={20} />
              Back Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-12 flex justify-center"
        >
          <div className="p-5 rounded-full bg-white/5 border border-white/10">
            <Search className="text-blue-400" size={40} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}