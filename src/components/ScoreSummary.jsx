import React from "react";

export default function ScoreSummary({ onRestart }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-2">Quiz Finished</h2>
      <p className="mb-4">You scored 0 / 1</p>
      <div className="flex gap-2 justify-center">
        <button onClick={onRestart} className="bg-blue-600 text-white px-4 py-2 rounded">Try Again</button>
      </div>
    </div>
  );
}
