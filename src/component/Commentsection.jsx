"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState, useEffect } from "react";

export function CommentSection({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // 💡 এডিটিং স্টেট ট্র্যাক করার জন্য
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const session = useSession();
  const sessionUser = session?.data?.user;

  // ─── ডাটাবেজ থেকে কমেন্ট নিয়ে আসার ফাংশন ───
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${ideaId}`,{
        cache: "no-store"
      });
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

  // ─── নতুন কমেন্ট পোস্ট করার ফাংশন ───
  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    const commentData = {
      ideaId: ideaId,
      userName: sessionUser?.name || "Anonymous",
      userImage: sessionUser?.image || "",
      text: newComment,
      userid: sessionUser?.id || sessionUser?._id || "",
      email: sessionUser?.email || "",
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // ─── কমেন্ট ডিলিট করার ফাংশন ───
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
        
      });
      if (res.ok) {
        fetchComments(); // ডিলিট হওয়ার পর লিস্ট রিফ্রেশ
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // ─── কমেন্ট এডিট সেভ করার ফাংশন ───
  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingText }),
      });
      if (res.ok) {
        setEditingCommentId(null);
        setEditingText("");
        fetchComments(); // আপডেট হওয়ার পর লিস্ট রিফ্রেশ
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "AN";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.02)] max-w-3xl mx-auto">
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
        Comments ({comments.length})
      </h3>

      {/* কমেন্ট লেখার ইনপুট */}
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

      {/* কমেন্ট লিস্ট */}
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 font-medium pt-2">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => {
            // 💡 চেক করা হচ্ছে এই কমেন্টটি বর্তমান লগইন করা ইউজারের কিনা
            const isMyComment =
              sessionUser &&
              (comment.userid === sessionUser.id ||
                comment.email === sessionUser.email);

            return (
              <div
                key={comment._id}
                className="bg-gray-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100/40 dark:border-slate-900/60 flex gap-3.5 items-start relative group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                  {comment.userImage ? (
                    <img
                      src={comment.userImage}
                      alt={comment.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{getInitials(comment.userName)}</span>
                  )}
                </div>

                <div className="flex flex-col min-w-0 w-full">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {comment.userName}
                  </span>

                  {/* 💡 এডিট মোড কন্ডিশনাল রেন্ডারিং */}
                  {editingCommentId === comment._id ? (
                    <div className="flex flex-col gap-2 mt-1 w-full">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="bg-white dark:bg-slate-900 text-xs border border-indigo-500 rounded-lg p-2 text-slate-800 dark:text-slate-100 outline-none w-full"
                      />
                      <div className="flex gap-2 self-start">
                        <button
                          onClick={() => handleSaveEdit(comment._id)}
                          className="text-[10px] bg-green-600 text-white font-bold px-2.5 py-1 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-[10px] bg-gray-500 text-white font-bold px-2.5 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 break-words">
                      {comment.text || comment["text "] || ""}
                      {comment.isEdited && (
                        <span className="text-[10px] text-gray-400 font-normal italic ml-1">
                          (edited)
                        </span>
                      )}
                    </span>
                  )}

                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold mt-2">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "Just now"}
                  </span>
                </div>

                {/* 💡 শুধুমাত্র নিজের কমেন্ট হলে ডিলিট ও এডিট বাটন দেখাবে */}
                {isMyComment && editingCommentId !== comment._id && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingText(comment.text || comment["text "] || "");
                      }}
                      className="text-xs font-bold text-indigo-500 hover:text-indigo-600 bg-indigo-50 dark:bg-slate-900 p-1 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 dark:bg-slate-900 p-1 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
