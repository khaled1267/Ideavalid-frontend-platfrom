import React from "react";
import Ideacard from "@/component/Ideacard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DeleteModel } from "@/component/deletepage";
import { EditModal } from "@/component/Editmodel";

export const metadata = {
  title: 'My Ideas | Ideavalid',
  description: 'Ideavalid is a platform that allows you to share your startup ideas with the world and get valuable feedback.',
};

const fetchMyIdeas = async (userid) => {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:5000";

    const res = await fetch(`${baseUrl}/my-ideavalid/${userid}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return [];
  }
};

const MyIdeasPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-500">
        <p className="text-xl font-semibold">
          Please log in to view your workspace.
        </p>

        <Link
          href="/login"
          className="text-2xl text-[#00A896] underline font-bold mt-2"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const userid = session.user.id;

  const ideas = await fetchMyIdeas(userid);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            My Pipeline
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Concepts created exclusively by you
          </p>
        </div>

        <Link
          href="/add-idea"
          className="text-xs bg-gradient-to-r from-[#00A896] to-[#028090] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-1 shadow-sm"
        >
          Add New Idea <ArrowRight size={14} />
        </Link>
      </div>

      {/* Empty State */}
      {ideas.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2.5rem]">
          <p className="text-sm text-gray-400 font-semibold">
            You have not added any startup concepts yet.
          </p>
        </div>
      ) : (
        /* Ideas Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((singleIdea) => (
            <div
              key={singleIdea._id}
              className="flex flex-col relative group"
            >
              {/* Action Buttons */}
              <div className="flex justify-between items-center px-2 py-1 bg-gray-50 dark:bg-slate-900 border border-b-0 border-gray-100 dark:border-slate-800 rounded-t-2xl">
                <EditModal ideaData={singleIdea} />

                <DeleteModel userid={singleIdea._id} />
              </div>

              {/* Idea Card */}
              <div className="w-full">
                <Ideacard idea={singleIdea} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;