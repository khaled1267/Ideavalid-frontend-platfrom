"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState, useEffect } from "react";

export default function ProfileUpdatePage() {
  const [user, setUser] = useState({ name: "", email: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const session = useSession();
  const sessionUser = session?.data?.user;

  useEffect(() => {
    if (sessionUser) {
      setUser({
        name: sessionUser.name || "",
        email: sessionUser.email || "",
        image: sessionUser.image || "",
      });
    }
  }, [sessionUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const currentUserId = sessionUser?.id || sessionUser?._id;
    if (!currentUserId) return;

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${currentUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          image: user.image,
        }),
      });

      if (!res.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await res.json();

      if (data.success) {
        setMessage("🎉 Profile updated successfully!");
      } else {
        setMessage("❌ Failed to update profile. User not found in DB.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (session?.status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!sessionUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-4">
        <p className="text-sm text-gray-400 font-medium">
          Please log in to update your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-black mb-2">Update Profile</h2>
        <p className="text-xs text-slate-400 mb-6">
          Change your personal information
        </p>

        {message && (
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-xl text-xs font-semibold mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 opacity-60">
            <label className="text-xs font-bold text-slate-400">
              Email Address (Cannot be changed)
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={user.image}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl py-3 mt-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
