import React from "react";
import Ideacard from "@/component/Ideacard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DeleteModel } from "@/component/deletepage";
import { EditModal } from "@/component/Editmodel";

// 🎯 ১. সার্ভার সাইড থেকে সরাসরি ব্যাকএন্ড পোর্টে কল করার ফাংশন (প্রক্সি এখানে কাজ করবে না)
const fetchMyIdeas = async (userid) => {
  try {
    // নোট: ডেভেলপমেন্টে মেইন পোর্ট 'http://localhost:5000' অথবা প্রোডাকশন লিঙ্ক ব্যবহার করতে হবে
    const baseUrl = process.env.NODE_ENV === "production" 
      ? process.env.NEXT_PUBLIC_API_URL // লাইভ সার্ভার লিঙ্ক
      : "http://localhost:5000";       // আপনার লোকাল এক্সপ্রেস ব্যাকএন্ড পোর্ট

    const res = await fetch(`${baseUrl}/my-ideavalid/${userid}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
};

const MyIdeasPage = async () => {
  // ২. Better-Auth থেকে লগইন থাকা ইউজারের সেশন নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ইউজার লগইন না থাকলে মেসেজ দেখাবে
  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-slate-500">
        <p className="text-xl font-semibold">
          Please log in to view your workspace.
        </p>
        <Link
          href="/login"
          className="text-2xl text-[#00A896] underline font-bold mt-2"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // ৩. সেশন থেকে আইডি নিয়ে ডাটাবেজ থেকে ডেটা আনা (ফাংশন নেম ঠিক করা হয়েছে)
  const userid = session.user.id;
  const ideas = await fetchMyIdeas(userid);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            My Pipeline
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Concepts created exclusively by you
          </p>
        </div>
        <Link
          href="/add-idea"
          className="text-xs bg-gradient-to-r from-[#00A896] to-[#028090] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-1 shadow-sm"
        >
          Add New Idea <ArrowRight size={14} />
        </Link>
      </div>

      {/* 💡 আইডিয়া লিস্ট গ্রিড */}
      {ideas.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2.5rem]">
          <p className="text-sm text-gray-400 font-semibold">
            You havenot added any startup concepts yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((singleIdea) => (
            <div key={singleIdea._id} className="flex flex-col relative group">
              
              {/* 🛠️ এডিট এবং ডিলিট মডাল লেআউট সুন্দরভাবে কার্ডের ওপর সেট করা হলো */}
              <div className="flex justify-between items-center px-2 py-1 bg-gray-50 dark:bg-slate-900 border border-b-0 border-gray-100 dark:border-slate-800 rounded-t-2xl">
                <EditModal ideaData={singleIdea} />
                <DeleteModel userid={singleIdea} />
              </div>
              
              {/* মেইন আইডিয়া কার্ড (টপ রেডিয়াস ম্যানেজ করার জন্য নিচের কার্ডে একটু ওভাররাইট হতে পারে) */}
              <div className="w-full">
                <Ideacard idea={singleIdea} />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;