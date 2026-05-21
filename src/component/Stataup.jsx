import React from 'react';

const Stataup = () => {
    return (
        <div>
            <section className="w-11/12 mx-auto py-20">
  {/* Section Title */}
  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold">
      🚀 Startup Success Tips
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Practical tips to help you turn your ideas into successful startups.
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Card 1 */}
    <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      <div className="text-5xl mb-5">🎯</div>

      <h3 className="text-2xl font-bold mb-3">
        Validate Your Idea
      </h3>

      <p className="text-gray-600">
        Validate your startup idea with real users before investing time and money.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      <div className="text-5xl mb-5">💡</div>

      <h3 className="text-2xl font-bold mb-3">
        Solve Real Problems
      </h3>

      <p className="text-gray-600">
        Focus on solving genuine problems that people face every day.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      <div className="text-5xl mb-5">🚀</div>

      <h3 className="text-2xl font-bold mb-3">
        Start Small
      </h3>

      <p className="text-gray-600">
        Build a small MVP first and improve it using user feedback.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      <div className="text-5xl mb-5">🤝</div>

      <h3 className="text-2xl font-bold mb-3">
        Listen to Users
      </h3>

      <p className="text-gray-600">
        User feedback helps you improve your startup and grow faster.
      </p>
    </div>
  </div>
</section>
        </div>
    );
};

export default Stataup;