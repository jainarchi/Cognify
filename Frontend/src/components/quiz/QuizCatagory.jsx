import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe, Layout, Code, Cpu, Database, Coffee, Terminal,
  Star, Zap, Target, ChevronDown
} from "lucide-react";





const QuizCategory = () => {
  const navigate = useNavigate();
  const [openTech, setOpenTech] = useState(null);

  const technologies = [
    { id: "html", name: "HTML", icon: <Globe size={20} />, color: "bg-orange-50 text-orange-600" },
    { id: "css", name: "CSS", icon: <Layout size={20} />, color: "bg-blue-50 text-blue-600" },
    { id: "js", name: "JavaScript", icon: <Code size={20} />, color: "bg-yellow-50 text-yellow-600" },
    { id: "react", name: "React", icon: <Cpu size={20} />, color: "bg-cyan-50 text-cyan-600" },
    { id: "node", name: "Node.js", icon: <Code size={20} />, color: "bg-green-50 text-green-600" },
    { id: "mongodb", name: "MongoDB", icon: <Database size={20} />, color: "bg-emerald-50 text-emerald-600" },
    { id: "java", name: "Java", icon: <Coffee size={20} />, color: "bg-red-50 text-red-600" },
    { id: "python", name: "Python", icon: <Terminal size={20} />, color: "bg-indigo-50 text-indigo-600" },
  ];

  const levels = [
    { id: "basic", name: "Basic", icon: <Star size={16} />, color: "bg-green-50 text-green-600" },
    { id: "intermediate", name: "Intermediate", icon: <Zap size={16} />, color: "bg-blue-50 text-blue-600" },
    { id: "advanced", name: "Advanced", icon: <Target size={16} />, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="text-center my-6">
        <h2 className="text-2xl font-bold">Tech Quiz Master</h2>
        <p className="text-sm text-gray-600">Choose a technology & level</p>
      </div>

      {technologies.map((tech) => (
        <div key={tech.id} className={`border rounded-lg shadow ${tech.color}`}>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2 font-semibold">
              {tech.icon} {tech.name}
            </div>

            <button className="md:hidden" onClick={() => setOpenTech(openTech === tech.id ? null : tech.id)}>
              <ChevronDown className={openTech === tech.id ? "rotate-180" : ""} />
            </button>

            <div className="hidden md:flex gap-3">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => navigate(`/quiz/${tech.id}/${lvl.id}`)}
                  className={`px-4 py-1 rounded-full border flex gap-2 ${lvl.color}`}
                >
                  {lvl.icon} {lvl.name}
                </button>
              ))}
            </div>
          </div>

          {openTech === tech.id && (
            <div className="md:hidden p-3 space-y-2 bg-white">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => navigate(`/quiz/${tech.id}/${lvl.id}`)}
                  className={`w-full flex gap-2 p-2 rounded border ${lvl.color}`}
                >
                  {lvl.icon} {lvl.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizCategory;
