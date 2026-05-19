""
import React from "react";
import { Star } from "lucide-react";
import Ideacard from "./Ideacard";

const Feturedcard = async () => {
  // ব্যাকএন্ড থেকে ফিচারড ডাটা নিয়ে আসা
  const res = await fetch("http://localhost:5000/fetured");
  const data = await res.json();

  return (
    <div className="w-full py-8 max-w-6xl mx-auto">
      {/* সেকশন হেডার */}
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-[#00A896]">Ideas</span>
        </h2>
      </div>

      {/* গ্রিড লেআউট এবং আপনার তৈরি Ideacard কল */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((singleIdea) => (
          // 💡 এখানে আপনার Ideacard কম্পোনেন্টে প্রপ্স হিসেবে ডাটা পাঠানো হচ্ছে
          <Ideacard key={singleIdea._id} idea={singleIdea} />
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-400 py-6 text-sm">
          কোনো ফিচারড আইডিয়া এই মুহূর্তে উপলব্ধ নেই।
        </p>
      )}
    </div>
  );
};

export default Feturedcard;
