"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Star } from "lucide-react";
import Ideacard from "./Ideacard";
import LoadingSpinner from "./Lodding";

const Feturedcard =  () => {
   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Fetch
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fetured`
        );

        const result = await res.json();

        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // Loading State
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full py-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-[#00A896]">Ideas</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((singleIdea) => (
          <Ideacard key={singleIdea._id} idea={singleIdea} />
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-400 py-6 text-sm">
          কোনো ফিচারড আইডিয়া এই মুহূর্তে উপলব্ধ নেই।
           <Suspense fallback={<LoadingSpinner />}></Suspense>
        </p>
      )}
    </div>
  );
};

export default Feturedcard;
