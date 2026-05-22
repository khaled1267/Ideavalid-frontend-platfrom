import React from "react";
import { 
  BrainCircuit, TrendingUp, BarChart3, 
  Target, Sparkles, Activity, ShieldCheck 
} from "lucide-react";

export default function AiAnalyticsSection() {
  return (
    <div className="w-full py-16 bg-[#F8F9FA] dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 dark:bg-teal-950/30 text-[#00A896] text-xs font-bold rounded-full border border-teal-100/50 dark:border-teal-900/30">
            <BrainCircuit className="w-3.5 h-3.5 animate-pulse" /> IdeaVault AI Engine
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Analytics & <span className="bg-gradient-to-r from-[#00A896] to-[#028090] bg-clip-text text-transparent">Market Validation</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
            আমাদের কৃত্রিম বুদ্ধিমত্তা প্রতিটি আইডিয়ার সম্ভাব্যতা, বাজার চাহিদা এবং রিস্ক ফ্যাক্টর নিখুঁতভাবে অ্যানালাইসিস করে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Validation Dashboard</h3>
                    <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">Real-time startup sector viability</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  ● Live Data
                </span>
              </div>

              <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 relative border-b border-l border-gray-100 dark:border-slate-800">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-dashed">
                  <div className="w-full border-b border-dashed border-gray-100 dark:border-slate-800/40"></div>
                  <div className="w-full border-b border-dashed border-gray-100 dark:border-slate-800/40"></div>
                  <div className="w-full border-b border-dashed border-gray-100 dark:border-slate-800/40"></div>
                </div>

                <div className="w-full flex items-end justify-between px-4 h-full relative z-10">
                  <div className="w-8 bg-gradient-to-t from-[#00A896]/20 to-[#00A896] rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "40%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Jan: 40%</span>
                  </div>
                  <div className="w-8 bg-gradient-to-t from-[#028090]/20 to-[#028090] rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "65%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Mar: 65%</span>
                  </div>
                  <div className="w-8 bg-gradient-to-t from-[#00A896]/20 to-[#00A896] rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "55%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">May: 55%</span>
                  </div>
                  <div className="w-8 bg-gradient-to-t from-teal-500/20 to-teal-400 rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "85%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Jul: 85%</span>
                  </div>
                  <div className="w-8 bg-gradient-to-t from-[#028090]/20 to-[#028090] rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "70%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Sep: 70%</span>
                  </div>
                  <div className="w-8 bg-gradient-to-t from-[#00A896]/20 to-[#00A896] rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: "92%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Now: 92%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-slate-800 text-center">
              <div>
                <div className="text-lg md:text-xl font-black text-slate-800 dark:text-white">1.2M+</div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Data Points</p>
              </div>
              <div className="border-x border-gray-100 dark:border-slate-800">
                <div className="text-lg md:text-xl font-black text-[#00A896]">98.4%</div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Accuracy</p>
              </div>
              <div>
                <div className="text-lg md:text-xl font-black text-slate-800 dark:text-white">24/7</div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AI Audit</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.01)] flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 fill-amber-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Market Fit Index</h3>
              </div>

              <div className="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                  <circle cx="50" cy="50" r="40" stroke="#00A896" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="38.5" strokeLinecap="round" className="drop-shadow-[0_4px_10px_rgba(0,168,150,0.4)]" />
                </svg>
                <div className="absolute space-y-0.5">
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">84.6%</div>
                  <div className="text-[10px] font-bold text-[#00A896] uppercase tracking-wider">High Viability</div>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-50/60 dark:bg-slate-850 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Market Insights</h4>
                <p className="text-[11px] text-gray-400 dark:text-slate-400 font-medium leading-relaxed">
                  বর্তমান ফাইন্যান্সিয়াল ও টেক ট্রেন্ড অনুযায়ী এই প্ল্যাটফর্মের বেশিরভাগ আইডিয়াই ইনভেস্টরদের কাছে আকর্ষনীয়।
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}