import { Award, Star, Zap } from "lucide-react";

const MainPageView = () => {
  return (
    <div className="overflow-hidden px-4 py-8">
   
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>

      <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6 py-16 md:py-20 md:p-10 shadow-md text-center">

        <div className="flex justify-center mb-6">
           <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner ">
              <Award size={40} className="text-purple-600 " />
            </div>
        </div>


        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Welcome to <span className="text-purple-700">Tech Quiz Master</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Test your skills, track your progress, and master modern technologies.
          Choose a technology and challenge yourself with different difficulty
          levels.
        </p>

       


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-purple-100 shadow-sm hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Star size={20} className="text-purple-700" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-lg">
                8+ Technologies
              </h3>
              <p className="text-sm text-gray-600">
                HTML, CSS, JavaScript, React, Node, and more
              </p>
            </div>
          </div>

        
          <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-purple-100 shadow-sm hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Zap size={20} className="text-purple-700" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-lg">
                Three Difficulty Levels
              </h3>
              <p className="text-sm text-gray-600">
                Basic, Intermediate, and Advanced quizzes
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainPageView;