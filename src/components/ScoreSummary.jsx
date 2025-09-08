import React from "react";

export default function ScoreSummary({ score = 0, onRestart }) {
  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">Quiz Completed</h2>
      <p className="mb-4">Your score: <span className="font-semibold">{score}</span></p>

      <div className="flex gap-2 justify-center">
        <button onClick={onRestart} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Take another</button>
      </div>
    </div>
  );
}
