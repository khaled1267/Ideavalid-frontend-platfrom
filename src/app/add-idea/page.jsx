"use client";

import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  Tag,
  FileText,
  Target,
  DollarSign,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddIdea() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("আইডিয়া পোস্ট করতে প্রথমে লগইন করুন।");
      router.push("/login");
    }
  }, [user, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const ideaData = {
      title: formData.get("title"),
      category: formData.get("category"),
      shortDescription: formData.get("shortDgbgbfescription"),
      detailedDescription: formData.get("detailedDescription"),
      tags: formData.get("tags"),
      imageUrl: formData.get("imageUrl"),
      budget: formData.get("budget"),
      targetAudience: formData.get("targetAudience"),
      problemStatement: formData.get("problemStatement"),
      proposedSolution: formData.get("proposedSolution"),
      userId: user.id,
      userName: user.name,
      userImage: user.image,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-ideavalid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("আপনার আইডিয়াটি সফলভাবে সাবমিট হয়েছে! 🚀");
        e.target.reset();
        router.push("/ideas");
      } else {
        toast.error(data.message || "আইডিয়া পাবলিশ করা যায়নি।");
      }
    } catch (error) {
      console.error(error);
      toast.error("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA] dark:bg-slate-950">
        <div className="animate-spin h-8 w-8 text-[#00A896] border-4 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#F8F9FA] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Submit Your{" "}
            <span className="bg-gradient-to-r from-[#00A896] to-[#028090] bg-clip-text text-transparent">
              Idea
            </span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 font-medium text-sm">
            Share your startup concept with the world and get valuable feedback.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-[0_10px_50px_rgba(0,0,0,0.02)] space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Idea Title <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Lightbulb className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g., Next-gen AI Assistant"
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Tag className="absolute left-4 w-5 h-5 text-gray-400" />
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence / AI
                  </option>
                  <option value="SaaS">SaaS Platform</option>
                  <option value="FinTech">FinTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="Web3 & Crypto">Web3 & Crypto</option>
                </select>
                <span className="absolute right-5 text-gray-400 text-xs pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
              Short Description <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <FileText className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                id="shortDescription"
                name="shortDescription"
                type="text"
                required
                placeholder="A one-sentence summary of your idea"
                className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="detailedDescription"
              name="detailedDescription"
              required
              rows={4}
              placeholder="Explain how your idea works in detail..."
              className="w-full px-5 py-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-[1.5rem] text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] resize-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Tags
              </label>
              <div className="relative flex items-center">
                <Tag className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="innovation, tech, startup (comma-separated)"
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Image URL
              </label>
              <div className="relative flex items-center">
                <ImageIcon className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Estimated Budget
              </label>
              <div className="relative flex items-center">
                <DollarSign className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g., $10k - $50k"
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Target Audience
              </label>
              <div className="relative flex items-center">
                <Target className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  id="targetAudience"
                  name="targetAudience"
                  type="text"
                  placeholder="Who is this for?"
                  className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Problem Statement
              </label>
              <div className="relative flex items-start">
                <AlertCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  rows={3}
                  placeholder="What problem are you solving?"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-[1.5rem] text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] resize-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                Proposed Solution
              </label>
              <div className="relative flex items-start">
                <CheckCircle2 className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="proposedSolution"
                  name="proposedSolution"
                  rows={3}
                  placeholder="How does your idea solve this problem?"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-[1.5rem] text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#00A896] resize-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 h-13 flex items-center justify-center gap-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#00A896] to-[#028090] shadow-[0_4px_15px_rgba(0,168,150,0.2)] hover:opacity-95 disabled:opacity-70 active:scale-[0.99] transition-all cursor-pointer"
            >
              {loading ? (
                "Submitting Idea..."
              ) : (
                <>
                  <>Submit Idea to Vault</>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
