"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { authClient } from "@/lib/auth-client"; // 💡 Better-Auth সেশন

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 💡 Better-Auth থেকে ইউজার সেশন ডাটা নেওয়া
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ডার্ক মোড ইনিশিয়াল চেক করার জন্য ইফেক্ট
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 🌓 থিম চেঞ্জ করার ফাংশন (ফিক্সড)
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // 💡 Better-Auth লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          setIsOpen(false);
          router.push("/login"); // লগআউট হলে লগইন পেজে রিডাইরেক্ট করবে
          router.refresh();
        },
      },
    });
  };

  // মাঝখানের ক্যাপসুল মেনুর স্টাইল
  const getNavLinkStyles = (path) => {
    const isActive = pathname === path;
    return `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
      isActive
        ? "bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-[0_4px_12px_rgba(0,168,150,0.3)]"
        : "text-gray-600 dark:text-gray-300 hover:text-[#00A896] dark:hover:text-[#00A896]"
    }`;
  };

  return (
    <nav className="w-full bg-[#F8F9FA] dark:bg-slate-900 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50  transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ─── বামে: লোগো সেকশন ─── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#028090] to-[#00A896] flex items-center justify-center shadow-md">
            <span className="text-white text-lg">💡</span>
          </div>
          <span className="text-xl font-bold text-[#028090] dark:text-teal-400 tracking-tight">
            IdeaVault
          </span>
        </Link>

        {/* ─── মাঝখানে: মেইন ক্যাপসুল মেনু ─── */}
     <div className="hidden md:flex items-center bg-white dark:bg-slate-800 border border-gray-100/80 dark:border-slate-700/50 px-2 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
  <Link href="/" className={getNavLinkStyles("/")}>
    Home
  </Link>
  <Link href="/ideas" className={getNavLinkStyles("/ideas")}>
    Ideas
  </Link>
  <Link href="/add-idea" className={getNavLinkStyles("/add-idea")}>
    Add Idea
  </Link>
  <Link href="/my-ideas" className={getNavLinkStyles("/my-ideas")}>
    My Ideas
  </Link>
  <Link href="/my-interactions" className={getNavLinkStyles("/my-interactions")}>
    Interactions
  </Link>
</div>

        {/* ─── ডানে: থিম বাটন এবং প্রোফাইল স্টেট ─── */}
        <div className="hidden md:flex items-center gap-3">
          {/* থিম টগল বাটন */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-amber-400 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* লোডিং স্টেটে বাটন হাইড রাখার জন্য */}
          {!isPending && (
            <>
              {!user ? (
                // ─── ১. ইউজার লগইন না থাকলে (লগইন/রেজিস্ট্রেশন বাটন) ───
                <div className="flex items-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-2 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#00A896] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/regester"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#00A896] to-[#028090]"
                  >
                    <IoSparkles className="text-xs" />
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                // ─── ২. ইউজার সফলভাবে লগইন থাকলে (প্রোফাইল ড্রপডাউন) ───
                <div className="flex items-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
                  {/* প্রোফাইল বাটন ট্রিগার */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none"
                  >
                    <div className="relative">
                      <img
                        className="w-8 h-8 rounded-full object-cover border border-[#00A896] p-[1px]"
                        src={
                          user.image ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                        }
                        alt={user.name}
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00E676] border-2 border-white dark:border-slate-800 rounded-full"></span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <span className="text-gray-400 text-[10px] ml-0.5">▼</span>
                  </button>

                  {/* ড্রপডাউন বক্স */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-14 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 truncate border-b border-gray-50 dark:border-slate-700/50 mb-1">
                        {user.email}
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        Profile
                      </Link>
                      <hr className="border-gray-100 dark:border-slate-700/50 my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* ─── মোবাইল মেনু হ্যামবার্গার টগল ─── */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-amber-400"
          >
            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 shadow-sm"
          >
            {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* ─── মোবাইল ড্রয়ের মেনু ─── */}
      {isOpen && (
        <div className="md:hidden mt-3 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-md space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/ideas"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
          >
            Ideas
          </Link>

          {user ? (
            <>
              <Link
                href="/add-idea"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
              >
                Add Idea
              </Link>
              <Link
                href="/my-ideas"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
              >
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
              >
                Interactions
              </Link>
              <hr className="border-gray-100 dark:border-slate-700 my-1" />
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-[#00A896] font-medium text-sm"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg text-red-500 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <hr className="border-gray-100 dark:border-slate-700 my-1" />
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/regester"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-[#00A896] text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;