"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, User } from "lucide-react";

const Ideacard = ({ idea }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-6 md:p-7 flex flex-col justify-between hover:shadow-[0_15px_50px_rgba(0,0,0,0.04)] dark:hover:border-slate-700/50 transition-all duration-300 group relative overflow-hidden">
      <div>
        {/* ─── ১. আইডিয়া ইমেজ ইউআরএল (যদি থাকে) ─── */}
        {idea.imageUrl && (
          <div className="w-full h-44 rounded-[1.8rem] overflow-hidden mb-5 bg-gray-50 dark:bg-slate-950 border border-gray-100/50 dark:border-slate-900">
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none"; // ইমেজ লিংকে কোনো সমস্যা থাকলে পুরো বক্সটি হাইড হয়ে যাবে
              }}
            />
          </div>
        )}

        {/* ─── ২. আইডিয়া টাইটেল ─── */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight flex items-start justify-between gap-2">
          <span className="line-clamp-2">{idea.title}</span>
          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#00A896] shrink-0 transition-colors pt-0.5" />
        </h3>

        {/* ─── ৩. আইডিয়া ডেসক্রিপশন ─── */}
        <p className="text-gray-500 dark:text-slate-400 text-xs font-medium mb-6 line-clamp-4 leading-relaxed">
          {idea.detailedDescription || idea.shortDescription}
        </p>
      </div>

      {/* ─── ৪. ফুটার: ক্রিয়েটর ইনফো এবং ভিউ বাটন ─── */}
      <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3">
        {/* যে ইউজার পোস্ট করেছে তার প্রোফাইল */}
        <div className="flex items-center gap-2.5 min-w-0">
          

          <div className="truncate">
            <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              Posted By
            </p>
            {/* <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[110px] sm:max-w-[140px]">
              {idea.userId}
            </p> */}
          </div>
        </div>

        {/* অ্যাকশন বাটন */}
        <Link
          href={`/ideas/${idea._id}`}
          className="text-center px-4 py-2 bg-gradient-to-r from-[#00A896] to-[#028090] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 shrink-0"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Ideacard;
