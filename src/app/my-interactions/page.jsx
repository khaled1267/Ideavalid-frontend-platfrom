"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function MyInteractionsPage() {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const session = useSession();
  const currentUser = session?.data?.user;

  useEffect(() => {
    document.title = "My Interactions | Ideavalid";
  }, []);

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!currentUser?.email) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user-comments/${currentUser.email}`,
        );
        if (res.ok) {
          const data = await res.json();
          setMyComments(data);
        }
      } catch (error) {
        console.error("Error fetching interactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.status !== "loading") {
      fetchMyComments();
    }
  }, [currentUser?.email, session?.status]);

  if (session?.status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-4">
        <p className="text-sm text-gray-400 font-medium">
          Please log in to see your interactions.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black mb-2">My Interactions</h2>
        <p className="text-xs text-slate-400 mb-8">
          All the comments you have posted across different ideas
        </p>

        {myComments.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
            <p className="text-sm text-gray-400 font-medium">
              You havenot commented on any ideas yet!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col gap-2 transition-all hover:border-slate-700"
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm text-slate-200 font-medium break-words max-w-2xl">
                    {comment.text}
                  </p>

                  <span className="text-[10px] text-gray-500 font-semibold shrink-0">
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

                
                {comment.ideaId && (
                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center">
                    <Link
                      href={`/ideas/${comment.ideaId}`}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      View Original Idea ➔
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
