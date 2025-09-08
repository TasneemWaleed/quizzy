import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    // لو دخل المستخدم للصفحة مباشرة بدون نتيجة -> نرجعه للصفحة الرئيسية
    navigate("/");
    return null;
  }

  const { score, total, answers } = state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-2">Quiz Completed</h2>
        <p className="mb-4">Your score: <span className="font-semibold">{score}</span> / {total}</p>

        <div className="mb-4">
          {answers && answers.map((a, i) => (
            <div key={i} className="mb-2 p-2 border rounded">
              <div className="text-sm text-gray-600">{a.question}</div>
              <div>
                <span className={a.selected === a.correct ? "text-green-600 font-semibold" : "text-red-600"}>
                  Selected: {a.selected ?? "No answer"}
                </span>
              </div>
              <div className="text-sm text-gray-600">Correct: {a.correct}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Take another</button>
        </div>
      </div>
    </div>
  );
}
