"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Image as ImageIcon, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { refresh } from "next/cache";

export default function Regester() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
      e.preventDefault();
    // console.log(e.currentTarget);

    const formData = new FormData(e.currentTarget);
    // console.log(formData);

    const registerData = Object.fromEntries(formData.entries());
console.log(registerData);
    const { data, error } = await signUp.email({
    //   ...registerData,
    email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      callbackURL: "/",
    });
    console.log(data);
    if (data) {
      toast.success("Registration successful");
    }
      router.push("/");
      refresh();

    if (error) {
      toast.error("Registration failed");
      return;
    }
  
  };


  return (
    <div className="min-h-[85vh] flex flex-col bg-[#F8F9FA] dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* মূল কার্ড */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
            
            <div className="text-center space-y-2 relative mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Create <span className="bg-gradient-to-r from-[#00A896] to-[#028090] bg-clip-text text-transparent">Account</span>
              </h2>
              <p className="text-gray-400 dark:text-slate-400 font-medium text-xs">
                Join IdeaVault to validate and explore startup ideas
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              
              {/* ১. ফুল নেম ফিল্ড */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* ২. ইমেইল ফিল্ড */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* ৩. প্রোফাইল ইমেজ ফিল্ড */}
              <div className="space-y-1.5">
                <label htmlFor="image" className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                  Profile Image URL (Optional)
                </label>
                <div className="relative flex items-center">
                  <ImageIcon className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* ৪. পাসওয়ার্ড ফিল্ড */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 mt-4 flex items-center justify-center gap-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#00A896] to-[#028090] shadow-[0_4px_15px_rgba(0,168,150,0.25)] hover:opacity-95 disabled:opacity-70 active:scale-[0.99] transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* সাইন ইন লিঙ্ক */}
            <div className="text-center pt-5">
              <p className="text-xs text-gray-400 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#00A896] font-bold hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}