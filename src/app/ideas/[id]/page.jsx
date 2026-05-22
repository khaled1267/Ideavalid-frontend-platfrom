import React from "react";
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
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// 🌐 সার্ভার সাইডেই ডেটা ফেচ করার ফাংশন
async function getIdeaDetails(id, token) {
  if (!id) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-ideavalid/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // সার্ভার সাইড ফেচিং এ ক্যাশিং কন্ট্রোল (প্রয়োজন অনুযায়ী পরিবর্তন করতে পারেন)
      cache: "no-store", 
    });

    if (res.ok) {
      return await res.json();
    }
    console.error("Failed to fetch data from server. Status:", res.status);
    return null;
  } catch (error) {
    console.error("Error fetching idea details:", error);
    return null;
  }
}

// মেইন সার্ভার কম্পোনেন্ট (async ব্যবহার করা হয়েছে)
export default async function IdeaDetailsPage({ params }) {
  // সার্ভার কম্পোনেন্টে সরাসরি params আনর‍্যাপ বা রিড করা যায়
  const { id } = await params;

  // 🔐 সার্ভার সাইডেই সেশন বা টোকেন বের করা হচ্ছে
  let token = "";
  let activeUser = { id: "", name: "Anonymous", email: "", image: "" };

  try {
    const sessionHeaders = await headers();
    const session = await auth.api.getToken({
      headers: sessionHeaders,
    });
    
    if (session?.token) {
      token = session.token;
    }

    // আপনার অথেন্টিকেশন লাইব্রেরি অনুযায়ী ইউজার ডাটা বের করা (যদি সেশনে থাকে)
    if (session?.user) {
      activeUser = {
        id: session.user.id || session.user._id || "",
        name: session.user.name || "Anonymous",
        email: session.user.email || "",
        image: session.user.image || "",
      };
    } else {
      // ব্যাকআপ ডামি ইউজার
      activeUser = {
        id: "user_67a0d378b7",
        name: "Khaled Mahmud",
        email: "khaled@example.com",
        image: "",
      };
    }
  } catch (err) {
    console.error("Error fetching auth session on server:", err);
  }

  // ডেটা ফেচ করা হচ্ছে
  const idea = await getIdeaDetails(id, token);

  // আইডিয়া না পাওয়া গেলে স্ক্রিন
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
          
          {/* বাম পাশের মেইন কনটেন্ট সেকশন */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              
              {/* আইডিয়ার ইমেজ */}
              {idea.image && (
                <div className="w-full h-[250px] md:h-[380px] rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                  <img
                    src={idea.image}
                    alt={idea.title || "Idea Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* মেটা ইনফো (ক্যাটাগরি ও তারিখ) */}
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
                        alt={idea.userName || "User Avatar"}
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
                      {idea.userName || "Unknown"}
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
                  {idea.problemStatement || "No specific problem details provided."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30">
                <h3 className="text-sm font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-2">
                  <Lightbulb size={16} /> Proposed Solution
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {idea.proposedSolution || "No proposed solution details provided."}
                </p>
              </div>
            </div>
          </div>

          {/* 👉 ডান পাশের সেকশন: কমেন্ট সেকশন (Sticky) */}
          {/* সার্ভার থেকে পাওয়া activeUser প্রপস হিসেবে পাঠানো হলো */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <CommentSection ideaId={id} currentUser={activeUser} />
          </div>
        </div>

      </div>
    </div>
  );
}