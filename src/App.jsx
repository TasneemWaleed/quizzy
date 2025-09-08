import React, { useState } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";

export default function App() {
  const [screen, setScreen] = useState("start");

  const [settings, setSettings] = useState({
    category: "",
    difficulty: "easy",
    amount: 5,
  });

  const [score, setScore] = useState(0);

  const handleRestart = () => {
    setScore(0);
    setSettings({ category: "", difficulty: "easy", amount: 5 });
    setScreen("start");
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100">
      
      {/* w-screen h-screen flex items-center justify-center p-4 bg-gray-100 */}
      <div className="w-full max-w-md">
        {screen === "start" && (
          <QuizStart
            onStart={(s) => {
              setSettings(s);
              setScreen("quiz");
            }}
          />
        )}

        {screen === "quiz" && (
          <QuestionCard
            settings={settings}
            onFinish={(finalScore) => {
              setScore(finalScore);
              setScreen("results");
            }}
            onBack={() => setScreen("start")}
          />
        )}

        {screen === "results" && (
          <ScoreSummary score={score} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
