import { Award, Star, Zap } from "lucide-react";

const QuizHero = () => {
  return (
   
      <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6 py-16 md:py-20 md:p-10 shadow-sm text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Award size={36} className="text-indigo-700" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Welcome to <span className="text-indigo-700">Tech Quiz Master</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Test your skills, track your progress, and master modern technologies.
          Choose a technology and challenge yourself with different difficulty
          levels.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">

          {/* FEATURE 1 */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl ">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Star size={18} className="text-indigo-700" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">
                Multiple Technologies
              </h3>
              <p className="text-sm text-gray-600">
                HTML, CSS, JavaScript, React, Node, and more
              </p>
            </div>
          </div>

          {/* FEATURE 2 */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl ">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Zap size={18} className="text-indigo-700" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">
                Three Difficulty Levels
              </h3>
              <p className="text-sm text-gray-600">
                Basic, Intermediate, and Advanced quizzes
              </p>
            </div>
          </div>

        </div>
      </div>
 
  );
};

export default QuizHero;
