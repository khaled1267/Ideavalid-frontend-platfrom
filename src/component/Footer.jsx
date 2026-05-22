"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { FiZap } from "react-icons/fi";
import { ArrowRight, Mail, ShieldCheck, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Welcome aboard! You have successfully subscribed to IdeaVault updates.");
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] dark:from-[#020617] dark:to-[#090d16] border-t border-slate-800 transition-colors duration-300 relative overflow-hidden text-slate-300">
      
      {/* ─── Background Ambient Glow Effects ─── */}
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#00A896]/10 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#028090]/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 relative z-10">
        
        {/* ─── Top Section: Grid Layout ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Branding & Social Profiles */}
          <div className="space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-[#028090] to-[#00A896] flex items-center justify-center shadow-[0_4px_12px_rgba(0,168,150,0.3)] group-hover:scale-105 transition-transform duration-300">
                <span className="text-white text-sm">💡</span>
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Idea<span className="text-teal-400 font-medium">Vault</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm">
              A secure validation hub for next-generation entrepreneurs. Empowering innovators with analytics and ecosystem alignment.
            </p>
            
            {/* Modern Social Media Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: <FaFacebookF size={13} />, href: "#" },
                { icon: <BsTwitterX size={13} />, href: "#" },
                { icon: <LiaLinkedin size={14} />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-7.5 h-7.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#00A896] hover:border-[#00A896] flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Core Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
              <FiZap className="w-3.5 h-3.5 text-[#00A896]" /> Core Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { name: "Explore Startup Ideas", path: "/ideas" },
                { name: "Submit New Concept", path: "/add-idea" },
                { name: "AI Market Analytics", path: "#" },
                { name: "Investor Lounge", path: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 bg-[#00A896] rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 mr-1"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hot Sectors / Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Hot Sectors
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { name: "Artificial Intelligence (AI)", path: "#" },
                { name: "FinTech & Blockchain", path: "#" },
                { name: "SaaS Platforms", path: "#" },
                { name: "Green Tech Solutions", path: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 mr-1"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Join The Insider Circle
            </h4>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Get the weekly top 3 validated concepts straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-1 group/form">
              <Mail className="absolute left-3 w-3.5 h-3.5 text-slate-500 group-focus-within/form:text-[#00A896] transition-colors pointer-events-none" />
              <input
                type="email"
                required
                placeholder="Enter workspace email"
                className="w-full pl-9 pr-10 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1 p-1.5 bg-gradient-to-r from-[#00A896] to-[#028090] text-white rounded-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center shadow-md"
              >
                <ArrowRight size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* ─── Bottom Section: Copyright & Security Badges ─── */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-slate-500">
            © {currentYear} <span className="text-slate-400 font-bold">IdeaVault Inc.</span> 
            <span className="text-slate-500 ml-68  ">Developed by - </span><span className="text-slate-400 font-bold">Khaled Mahmud</span>
          </p>
          
          {/* Trust Assets & Status Elements */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-900/20">
              <ShieldCheck size={12} className="fill-emerald-500/10" /> Intellectual Property Protected
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;