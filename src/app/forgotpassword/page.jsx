import React from "react";
import Link from "next/link";
import { KeyRound, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full min-h-screen bg-[#FAFBFB] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#00A896]/5 dark:bg-[#00A896]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-[#028090]/5 dark:bg-[#028090]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#00A896] dark:hover:text-teal-400 transition-colors mb-6 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Login
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 md:p-10 transition-all">
          
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/30 text-[#00A896] flex items-center justify-center mb-4 border border-teal-100/30 mx-auto md:mx-0">
                <KeyRound size={22} />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Reset Password
              </h1>
              <p className="text-xs text-gray-400 dark:text-slate-400 font-medium leading-relaxed">
                Enter the email address associated with your IdeaVault account, and well transmit a secure reset vector link.
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 block">
                  Account Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-slate-950/40 border border-gray-200/60 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00A896] dark:focus:border-teal-500 placeholder-gray-400/70 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#00A896] to-[#028090] text-white text-xs font-bold rounded-xl shadow-md shadow-teal-500/10 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Send Reset Link
              </button>
            </form>
          </div>

        </div>

        <p className="text-[10px] text-center text-gray-400/80 dark:text-slate-600 font-medium mt-6">
          Secured by IdeaVault Decentralized Cryptography Registry logs.
        </p>

      </div>
    </div>
  );
}