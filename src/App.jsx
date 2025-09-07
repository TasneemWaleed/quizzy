import React, { useState } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";

export default function App() {
  const [screen, setScreen] = useState("start");
  const [settings, setSettings] = useState({ category: "", difficulty: "easy", amount: 5 });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
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
            onFinish={() => setScreen("results")}
            onBack={() => setScreen("start")}
          />
        )}

        {screen === "results" && <ScoreSummary onRestart={() => setScreen("start")} />}
      </div>

    </div>
  );
}
