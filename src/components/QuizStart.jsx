import React, { useState } from "react";

export default function QuizStart({ onStart }) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState(5);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Quizzy</h1>

      <label className="block mb-1 font-medium">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mb-4 border rounded">
        <option value="">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="17">Science & Nature</option>
        <option value="23">History</option>
        <option value="11">Movies</option>
      </select>

      <label className="block mb-1 font-medium">Difficulty</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 mb-4 border rounded">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="block mb-1 font-medium">Number of Questions</label>
      <input type="number" min="1" max="50" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 mb-4 border rounded" />

      <button onClick={() => onStart({ category, difficulty, amount })} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        Start Quiz
      </button>
    </div>
  );
}
