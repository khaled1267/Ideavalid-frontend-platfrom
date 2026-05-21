"use client";

import React, { useEffect, useState } from "react";
import {
  Lightbulb,
  Tag,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Ideacard from "@/component/Ideacard";
import SearchFilter from "@/component/Searchsection";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 আপনার ব্যাকএন্ডের GET API থেকে ডাটা নিয়ে আসা হচ্ছে
    // আপনি যদি রাউটের নাম পরিবর্তন করে থাকেন, তবে সেই অনুযায়ী ইউআরএল দিবেন (যেমন: /all-ideas)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-ideavalid`)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ideas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F9FA] dark:bg-slate-950">
        <div className="animate-spin h-8 w-8 text-[#00A896] border-4 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <Link
            href="/add-idea"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#00A896] to-[#028090] shadow-md hover:opacity-95 transition-all text-center justify-center w-fit"
          >
            <Sparkles className="w-4 h-4" /> Share Your Idea
          </Link>
        </div>

        <SearchFilter />

        {/* আইডিয়া কার্ড গ্রিড */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <Ideacard key={idea._id} idea={idea} />
          ))}
        </div> */}

        {/* কোনো আইডিয়া না থাকলে */}
        {ideas.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed rounded-[2.5rem] dark:border-slate-800">
            <Lightbulb className="w-12 h-12 mx-auto text-gray-300 dark:text-slate-700 mb-4 animate-pulse" />
            <p className="text-gray-400 dark:text-slate-500 font-medium text-sm">
              কোনো আইডিয়া খুঁজে পাওয়া যায়নি। প্রথম আইডিয়াটি আপনিই শেয়ার
              করুন!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
