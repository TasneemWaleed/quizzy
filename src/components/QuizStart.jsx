import React, { useState } from "react";

export default function QuizStart({ onStart }) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ category, difficulty, amount: Number(amount) });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/*w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-4 */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Welcome to Quizzy 🎉
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="17">Science & Nature</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              value={amount}
              min="1"
              max="20"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Start Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Start Quiz 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
