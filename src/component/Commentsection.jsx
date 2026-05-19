"use client";

import React, { useState, useEffect } from "react";
import { Button, Textarea, User } from "@heroui/react";

export function CommentSection({ ideaId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── ১. কমেন্টগুলো লোড করার ফাংশন ───
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

  // ─── ২. নতুন কমেন্ট সাবমিট করার ফাংশন ───
  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    const commentData = {
      ideaId,
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
        setNewComment(""); // বক্স খালি করা
        fetchComments();   // লিস্ট রিফ্রেশ করা
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.02)] max-w-3xl mx-auto mt-8">
      {/* হেডিং ও কাউন্টার */}
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
        Comments ({comments.length})
      </h3>

      {/* 📝 কমেন্ট লেখার ইনপুট ফিল্ড */}
      <div className="flex flex-col gap-3 mb-6">
        <Textarea
          variant="bordered"
          radius="xl"
          placeholder="Add your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          minRows={3}
          className="w-full text-sm"
        />
        <Button
          onClick={handlePostComment}
          isLoading={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl self-start px-5 py-2 shadow-md active:scale-95 transition-all"
        >
          Post Comment
        </Button>
      </div>

      {/* 💬 কমেন্ট লিস্ট সেকশন */}
      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 font-medium">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment._id} 
              className="bg-gray-50/60 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100/50 dark:border-slate-900/60 flex gap-3 items-start"
            >
              {/* HeroUI User Component (অটোমেটিক ইমেজ বা নামের প্রথম অক্ষর দেখাবে) */}
              <User
                name={
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{comment.userName}</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-1">{comment.text}</span>
                    <span className="text-[9px] text-gray-400 mt-2">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                }
                avatarProps={{
                  src: comment.userImage,
                  size: "sm",
                  className: "shrink-0"
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}