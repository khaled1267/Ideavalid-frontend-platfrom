"use client";

import React, { useState, useEffect } from "react";
import { CommentSection } from "@/component/Commentsection";
import {
  ArrowLeft,
  Target,
  Lightbulb,
  DollarSign,
  Tag,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";

export default function IdeaDetailsPage({ params }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeUser, setActiveUser] = useState({
    id: "",
    name: "Anonymous",
    email: "",
    image: "",
    userid: "",
    email: "",
  });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")); 
      if (storedUser) {
        setActiveUser({
          id: storedUser.uid || storedUser._id || storedUser.id || "",
          name: storedUser.displayName || storedUser.name || "Anonymous",
          email: storedUser.email || "",
          image: storedUser.photoURL || storedUser.image || "",
        });
      } else {
        setActiveUser({
          id: "user_67a0d378b7",
          name: "Khaled Mahmud",
          email: "khaled@example.com",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error reading user session:", error);
    }
  }, []);

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-ideavalid/${id}`);
        if (res.ok) {
          const data = await res.json();
          setIdea(data);
        } else {
          console.error("Failed to fetch data from server");
        }
      } catch (error) {
        console.error("Error fetching idea details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full rounded-full border-[3px] border-gray-200 dark:border-slate-800"></div>
          <div className="absolute w-full h-full rounded-full border-[3px] border-t-indigo-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 gap-4">
        <p className="text-gray-500 font-medium">Idea not found!</p>
        <Link
          href="/my-ideas"
          className="text-indigo-600 font-bold text-sm flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ⬅️ ব্যাক বাটন */}
        <Link
          href="/my-ideas"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md transition-all mb-8 active:scale-95"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              {idea.image && (
                <div className="w-full h-[250px] md:h-[380px] rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* মেটা ইনফো */}
              <div className="flex flex-wrap gap-4 items-center mb-4 text-xs font-bold text-gray-400 dark:text-slate-500">
                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-gray-100/60 dark:border-slate-900">
                  <Tag size={12} className="text-indigo-500" />{" "}
                  {idea.category || "Tech Idea"}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-gray-100/60 dark:border-slate-900">
                  <Calendar size={12} className="text-emerald-500" />
                  {idea.createdAt
                    ? new Date(idea.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently"}
                </span>
              </div>

              {/* শিরোনাম */}
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3">
                {idea.title}
              </h1>

              {/* ডেসক্রিপশন */}
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                {idea.description || "No short description provided."}
              </p>

              {/* পোস্টকারী প্রোফাইল */}
              <div className="pt-4 border-t border-gray-50 dark:border-slate-800/60 flex items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-800 flex items-center justify-center border border-gray-200/50 dark:border-slate-700">
                    {idea.userImage ? (
                      <img
                        src={idea.userImage}
                        alt={idea.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      Posted By
                    </p>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[140px] sm:max-w-[180px]">
                      {idea.userName}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* ২. বাজেট ও টার্গেট গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                  <DollarSign size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    Estimated Budget
                  </h4>
                  <p className="text-lg font-black text-slate-800 dark:text-white mt-0.5">
                    ${idea.budget || "0.00"}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    Target Audience
                  </h4>
                  <p className="text-base font-black text-slate-800 dark:text-white mt-0.5 truncate max-w-[200px]">
                    {idea.target || "General"}
                  </p>
                </div>
              </div>
            </div>

            {/* ৩. সমস্যা ও সমাধান */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_50px_rgba(0,0,0,0.02)] flex flex-col gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30">
                <h3 className="text-sm font-black text-amber-700 dark:text-amber-400 flex items-center gap-2 mb-2">
                  <Target size={16} /> Target Problem
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {idea.problemStatement ||
                    "No specific problem details provided."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30">
                <h3 className="text-sm font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-2">
                  <Lightbulb size={16} /> Proposed Solution
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {idea.proposedSolution ||
                    "No proposed solution details provided."}
                </p>
              </div>
            </div>
          </div>

          {/* 👉 ডান পাশের সেকশন: কমেন্ট সেকশন (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <CommentSection ideaId={id} currentUser={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
