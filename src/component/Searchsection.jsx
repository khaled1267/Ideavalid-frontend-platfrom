"use client";

import { useEffect, useState } from "react";
import Ideacard from "./Ideacard";

export default function SearchFilter() {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas?search=${search}&category=${category}`)
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, [search, category]);

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Web3 & Crypto"> Web3 & Crypto</option>
          <option value="HealthTech">HealthTech</option>
          <option value="FinTech">FinTech</option>
          <option value="SaaS">SaaS</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
        </select>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <Ideacard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
