import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import questionsData from "../../assets/dummyData";
import axios from "axios";
import { CheckCircle, XCircle, Target } from "lucide-react";

const API_BASE = "http://localhost:4000";

const ShowQuiz = () => {
  const navigate = useNavigate();
  const { tech, level } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const submittedRef = useRef(false);

  const questions = questionsData?.[tech]?.[level] || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (index) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: index }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const correct = questions.filter(
    (q, i) => userAnswers[i] === q.correctAnswer
  ).length;

  const wrong = questions.length - correct;
  const score = questions.length
    ? Math.round((correct / questions.length) * 100)
    : 0;



  const submitResult = async () => {
    if (submittedRef.current) return;
    if (!questions.length) return;

    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token ;
    if (!token) return;

    const payload = {
      title: `${tech.toUpperCase()} - ${level} Quiz`,
      technology: tech,
      level,
      totalQuestions: questions.length,
      correct,
      wrong,
    };

    try {
      submittedRef.current = true;

      await axios.post(`${API_BASE}/api/results`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    } catch (err) {
      submittedRef.current = false;
      console.error("Error saving result:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (showResults) {
      submitResult();
    }
  }, [showResults]);





  if (showResults) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-full md:w-[500px] mx-auto p-6 py-20 flex flex-col items-center bg-purple-50 rounded-lg shadow">
          <Target className="text-purple-600 mb-3" size={40} />

          <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>

          <div className="space-y-2">
            <p className="text-lg text-green-600 flex items-center gap-2">
              <CheckCircle /> Correct: {correct}
            </p>

            <p className="text-lg text-red-600 flex items-center gap-2">
              <XCircle /> Wrong: {wrong}
            </p>
          </div>

          <p className="text-xl font-semibold mt-4">
            Score: {score}%
          </p>


          <div className="flex gap-4 mt-6">
             <h3 onClick={() => {navigate('/')}} className="text-lg text-purple-600">Quizes</h3>
             <h3 onClick={() => {navigate('/profile')}} className="text-lg text-purple-600" >Profile</h3>
          </div>
        </div>
      </div>
    );
  }



  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="md:w-[500px] p-6 bg-purple-50 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2 capitalize text-purple-700">
          {tech} – {level} level
        </h2>

        <p className="mb-4 text-sm text-gray-600">
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
              className="w-full text-left px-4 py-2 border rounded
                hover:bg-purple-100 active:bg-purple-200 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowQuiz;
