import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* مثال أسئلة محلية مؤقتة */
const sampleQuestions = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["Berlin", "Rome", "Madrid"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
  },
  {
    question: "What is 2 + 2?",
    correct_answer: "4",
    incorrect_answers: ["3", "5", "22"],
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = location.state || { category: "any", difficulty: "easy", amount: 3 };

  // استخدمي الـ amount من settings لو حابة/لاحقًا بدل fetch
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answersSummary, setAnswersSummary] = useState([]); // لحفظ النتائج لكل سؤال

  useEffect(() => {
    // مؤقت: نستخدم sampleQuestions محددة بعدد settings.amount
    const useQ = sampleQuestions.slice(0, settings.amount);
    setQuestions(useQ);
  }, [settings.amount]);

  useEffect(() => {
    if (!questions || questions.length === 0) return;
    const q = questions[index];
    const opts = shuffleArray([q.correct_answer, ...q.incorrect_answers]);
    setOptions(opts);
    setSelected(null);
  }, [questions, index]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  const handleSelect = (opt) => {
    setSelected(opt);
  };

  const handleNext = () => {
    const q = questions[index];
    const isCorrect = selected === q.correct_answer;
    if (selected) {
      if (isCorrect) setScore((s) => s + 1);
      setAnswersSummary((prev) => [...prev, { question: q.question, selected, correct: q.correct_answer }]);
    } else {
      // لو المستخدم نسي يختار، نخزن كـ unanswered
      setAnswersSummary((prev) => [...prev, { question: q.question, selected: null, correct: q.correct_answer }]);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      // انتهى الكويز -> روح للـ results ومرر النتيجة
      navigate("/results", { state: { score, total: questions.length, answers: [...answersSummary, { question: q.question, selected: selected || null, correct: q.correct_answer }] } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">Q {index + 1} / {questions.length}</div>
          <div className="text-sm text-gray-600">Category: {settings.category}</div>
        </div>

        <h2 className="text-xl font-semibold mb-4">{questions[index].question}</h2>

        <div className="grid gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`text-left p-3 border rounded-lg ${selected === opt ? "bg-indigo-50 border-indigo-400" : "bg-white"}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={() => navigate("/")} className="text-sm text-gray-500">Cancel</button>
          <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            {index + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
