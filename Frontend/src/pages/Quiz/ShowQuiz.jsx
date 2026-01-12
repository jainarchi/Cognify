import { useParams } from "react-router-dom";
import { useState } from "react";
import questionsData from "../../assets/dummyData";
import { CheckCircle, XCircle, Target } from "lucide-react";



const QuizPage = () => {
  const { tech, level } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = questionsData?.[tech]?.[level] || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (index) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: index }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((p) => p + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const correct = questions.filter(
    (q, i) => userAnswers[i] === q.correctAnswer
  ).length;

  if (showResults) {
    return (
        <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full md:w-[500px] mx-auto p-6 py-20 flex flex-col justify-center items-center bg-purple-50">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>

        <div>
        <p className="text-lg text-green-500 flex items-center gap-2 mb-2">
            <CheckCircle/>
            Correct: {correct}</p>

        <p className="text-lg text-red-600 flex items-center gap-x-2">
            <XCircle />
          Wrong: {questions.length - correct}
        </p>
        
        </div>
        <p className="text-xl font-semibold mt-3">
          Score: {Math.round((correct / questions.length) * 100)}%
        </p>
      </div>
      </div>
    );
  }








  return (
    <div className="h-screen w-full flex justify-center items-center">

    <div className="md:w-[500px] p-6 bg-purple-50">
      <h2 className="text-xl font-bold mb-2 capitalize text-purple-700">
        {tech} – {level} level
      </h2>

      <p className="mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h3 className="text-lg font-semibold mb-4">
        {currentQ?.question}
      </h3>

      <div className="space-y-3">
        {currentQ?.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswerSelect(i)}
            className="w-full text-left px-4 py-2 border rounded hover:bg-purple-100 active:bg-purple-200"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>

    </div>
  );
};

export default QuizPage;
