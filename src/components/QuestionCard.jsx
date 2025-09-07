import React, { useState } from "react";

/* مكوّن تجريبي لعرض سؤال واحد (سيتغير لاحقًا لما نربط الـ API) */
export default function QuestionCard({ settings, onFinish, onBack }) {
  // مثال سؤال ثابت للمشاهدة أثناء الـ skeleton phase
  const sample = {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Rome", "Madrid"],
  };

  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <button onClick={onBack} className="text-sm text-gray-500">Back</button>
        <div className="text-sm text-gray-600">Q1 of 1</div>
      </div>

      <h2 className="text-lg font-semibold mb-4">{sample.question}</h2>

      <div className="grid gap-2">
        {sample.options.map((opt, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`text-left p-3 border rounded ${selected === i ? "bg-blue-50 border-blue-400" : "bg-white"}`}>
            {opt}
          </button>
        ))}
      </div>

      <button onClick={onFinish} className="mt-4 w-full bg-green-600 text-white p-2 rounded">Finish</button>
    </div>
  );
}
