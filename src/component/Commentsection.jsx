"use client";

import React, { useState, useEffect } from "react";

export function CommentSection({ ideaId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── ১. ডাটাবেজ থেকে পুরানো কমেন্টগুলো নিয়ে আসার ফাংশন ───
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${ideaId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (ideaId) fetchComments();
  }, [ideaId]);

  // ─── ২. নতুন কমেন্ট সাবমিট (Post) করার ফাংশন ───
  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    const commentData = {
      ideaId: ideaId,
      userName: currentUser?.name || "Anonymous",
      userImage: currentUser?.image || "",
      text: newComment,
    };

    try {
      const res = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        setNewComment(""); // ইনপুট বক্স খালি করা
        fetchComments();   // লাইভ কমেন্ট লিস্ট রিফ্রেশ করা
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // ইউজারের নামের প্রথম অক্ষর বের করার ফাংশন (ছবি না থাকলে দেখানোর জন্য)
  const getInitials = (name) => {
    if (!name) return "AN";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.02)] max-w-3xl mx-auto mt-8">
      {/* কমেন্ট কাউন্টার */}
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
        Comments ({comments.length})
      </h3>

      {/* 📝 কমেন্ট লেখার ইনপুট ফিল্ড */}
      <div className="flex flex-col gap-4 mb-6">
        <textarea
          placeholder="Add your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="w-full text-sm p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 outline-none resize-none focus:border-indigo-600 transition-colors min-h-[80px]"
        />
        <button
          onClick={handlePostComment}
          disabled={loading}
          className="bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-sm rounded-xl self-start px-5 py-2.5 shadow-sm active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>

      {/* 💬 কমেন্ট লিস্ট সেকশন */}
      <div className="flex flex-col gap-3">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 font-medium pt-2">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment._id} 
              className="bg-gray-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100/40 dark:border-slate-900/60 flex gap-3.5 items-start"
            >
              {/* 👤 রাউন্ডেড প্রোফাইল বা অ্যাভাটার বক্স */}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                {comment.userImage ? (
                  <img src={comment.userImage} alt={comment.userName} className="w-full h-full object-cover" />
                ) : (
                  <span>{getInitials(comment.userName)}</span>
                )}
              </div>

              {/* নাম, টেক্সট এবং ডেট */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {comment.userName}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 break-words">
                  {comment.text}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold mt-2">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}