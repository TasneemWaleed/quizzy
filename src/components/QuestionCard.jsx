import React, { useEffect, useState, useRef } from "react";

export default function QuestionCard({ settings, onFinish, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // الإجابة المختارة

  const fetched = useRef(false); // عشان نمنع double fetch

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `https://opentdb.com/api.php?amount=${settings.amount}&difficulty=${settings.difficulty}&type=multiple${
        settings.category ? `&category=${settings.category}` : ""
      }`;

      console.log("Fetching from:", url);

      const response = await fetch(url);

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error(`API returned error code ${data.response_code}`);
      }

      setQuestions(data.results);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchQuestions();
      fetched.current = true;
    }
  }, []);

  if (loading) {
    return <p className="text-center text-white">⏳ Loading questions...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p className="text-lg font-bold">❌ {error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold shadow"
        >
          Back
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-white">
        <p>⚠️ No questions found. Try different settings.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold shadow"
        >
          Back
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      {/* هيدر فيه رقم السؤال + الكاتيجوري */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-purple-700">
          Question {current + 1} of {questions.length}
        </h2>
        <span className="text-sm text-gray-500 font-semibold">
          {currentQuestion.category}
        </span>
      </div>

      {/* السؤال */}
      <p className="mb-4 text-gray-700 text-lg font-medium">
        {currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      </p>

      {/* الإجابات */}
      <div className="space-y-2">
        {answers.map((answer, idx) => {
          let btnClass =
            "w-full px-4 py-2 rounded-lg transition bg-purple-500 text-white hover:bg-purple-600";

          if (selected) {
            if (answer === currentQuestion.correct_answer) {
              btnClass = "w-full px-4 py-2 rounded-lg bg-green-500 text-white";
            } else if (answer === selected && answer !== currentQuestion.correct_answer) {
              btnClass = "w-full px-4 py-2 rounded-lg bg-red-500 text-white";
            } else {
              btnClass = "w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-700";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(answer)}
              className={btnClass}
              disabled={selected !== null}
            >
              {answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
            </button>
          );
        })}
      </div>

      {/* أزرار تحت */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>

        {selected && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {current + 1 < questions.length ? "Next Question" : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
