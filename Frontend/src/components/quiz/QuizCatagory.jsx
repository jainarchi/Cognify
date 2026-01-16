import { useNavigate } from "react-router-dom";
import { 
  Globe, Layout, Code, Cpu, Database, Coffee, Terminal, 
  Star, Zap, Target, ChevronRight 
} from "lucide-react";

const QuizCategory = () => {
  const navigate = useNavigate();

  const technologies = [
    { id: "html", name: "HTML", icon: <Globe size={24} />, color: "bg-orange-500" },
    { id: "css", name: "CSS", icon: <Layout size={24} />, color: "bg-blue-500" },
    { id: "js", name: "JavaScript", icon: <Code size={24} />, color: "bg-yellow-500" },
    { id: "react", name: "React", icon: <Cpu size={24} />, color: "bg-cyan-500" },
    { id: "node", name: "Node.js", icon: <Code size={24} />, color: "bg-green-600" },
    { id: "mongodb", name: "MongoDB", icon: <Database size={24} />, color: "bg-emerald-600" },
    { id: "java", name: "Java", icon: <Coffee size={24} />, color: "bg-red-500" },
    { id: "oops", name: "OOPs", icon: <Terminal size={24} />, color: "bg-indigo-500" },
  ];

  const levels = [
    { id: "basic", name: "Basic", icon: <Star size={16} />, borderColor: "border-green-200", hover: "hover:bg-green-500" },
    { id: "intermediate", name: "Intermediate", icon: <Zap size={16} />, borderColor: "border-blue-200", hover: "hover:bg-blue-500" },
    { id: "advanced", name: "Advanced", icon: <Target size={16} />, borderColor: "border-purple-200", hover: "hover:bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Choose Your Challenge</h1>
          <p className="text-gray-600">Select a technology and difficulty to start the Assessment.</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-y-10">
          {technologies.map((tech) => (
            <div 
              key={tech.id} 
              className="card-style"
            >
          
              <div className={`${tech.color} p-6 flex flex-col items-center text-white`}>
                <div className="bg-white/20 p-3 rounded-xl mb-3">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold">{tech.name}</h3>
              </div>

              {/* select level */}
              <div className="p-4 space-y-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => navigate(`/quiz/${tech.id}/${lvl.id}`)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border ${lvl.borderColor} group hover:text-white ${lvl.hover} transition-all duration-200`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="group-hover:text-white">{lvl.icon}</span>
                      <span className="text-sm font-semibold">{lvl.name}</span>
                    </div>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCategory;