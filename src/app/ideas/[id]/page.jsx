

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Tag,
  Target,
} from "lucide-react";
import React from "react";
import Link from "next/link";

const IdeaDetails = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`http://localhost:5000/add-ideavalid/${id}`);
  const idea = await response.json();
  
  

  return (
    <div className="w-full min-h-screen bg-[#FAFBFB] dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* ─── ব্যাক বাটন ─── */}
        <div className="mb-6">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#00A896] dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Workspace
          </Link>
        </div>

        {/* ─── মূল কন্টেন্ট কার্ড (আপনার কার্ড স্টাইলে তৈরি) ─── */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-6 md:p-10 space-y-6">
          
          {/* ইমেজ (যদি ইউজার দিয়ে থাকে) */}
          {idea.imageUrl && (
            <div className="w-full h-64 md:h-96 rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-slate-950">
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="w-full h-full object-cover"
               
              />
            </div>
          )}

          {/* ক্যাটাগরি এবং ট্যাগ */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 bg-teal-50 dark:bg-teal-950/30 text-[#00A896] rounded-full">
              <Tag className="w-3 h-3" /> {idea.category}
            </span>

            {idea.tags &&
              (typeof idea.tags === "string" ? idea.tags.split(",") : idea.tags).map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-800/40 px-2.5 py-1 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
          </div>

          {/* টাইটেল */}
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {idea.title}
          </h1>

          {/* এক লাইনের শর্ট ডেসক্রিপশন */}
          {idea.shortDescription && (
            <p className="text-slate-800 dark:text-slate-300 text-xs md:text-sm font-semibold p-4 bg-gray-50/60 dark:bg-slate-850 rounded-2xl border border-gray-100/50 dark:border-slate-800/40 leading-relaxed">
              {idea.shortDescription}
            </p>
          )}

          {/* মেইন ডেসক্রিপশন (ফুল টেক্সট দেখাবে, কোনো line-clamp নেই) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Comprehensive Blueprint</h3>
            <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line">
              {idea.detailedDescription}
            </p>
          </div>

          {/* প্রবলেম ও সリューション সেকশন */}
          {(idea.problemStatement || idea.proposedSolution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* সমস্যা */}
              {idea.problemStatement && (
                <div className="p-5 bg-amber-50/30 dark:bg-amber-950/10 rounded-2xl border border-dashed border-amber-200/60 dark:border-amber-900/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4 shrink-0" /> Target Problem
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                    {idea.problemStatement}
                  </p>
                </div>
              )}

              {/* সমাধান */}
              {idea.proposedSolution && (
                <div className="p-5 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-dashed border-emerald-200/60 dark:border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> Proposed Solution
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                    {idea.proposedSolution}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ফুটার: বাজেট এবং টার্গেট অডিয়েন্স */}
          <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-wrap gap-3 items-center text-xs text-gray-400 font-bold">
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-slate-600 dark:text-slate-300">
                Budget: {idea.budget || "No Budget"}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-slate-600 dark:text-slate-300">
                Target: {idea.targetAudience || "Everyone"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default IdeaDetails;