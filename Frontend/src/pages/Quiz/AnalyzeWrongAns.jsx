import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrainCircuit, ChevronLeft, Save, Loader2, Sparkles } from 'lucide-react';

const API_BASE = "http://localhost:4000";

const AnalyzeWrongAns = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wrongAnsArr = location.state?.wrong || [];

  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);



  useEffect(() => {
    const fetchAISummary = async () => {
      if (wrongAnsArr.length === 0) return;

       const auth = JSON.parse(localStorage.getItem('auth')); 
       const token = auth?.token ;
       console.log( 'token' , !!token);
      
      try {
        setIsGenerating(true);
        const res = await axios.post(
          `${API_BASE}/api/ai/analyze/wrongans`, 
          { wrongAnsArr },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('summary generated')
        setAiSummary(res.data.summary);

      } catch (err) {
        console.error("AI Generation Error:", err);
        setAiSummary("Sorry, AI could not generate a summary at this time.");

      } finally {
        setIsGenerating(false);
      }
    };

    fetchAISummary();
  }, []);



  const handleSaveToNotes = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      await axios.post(`${API_BASE}/api/notes`, {
        title: `AI Analysis: ${wrongAnsArr[0]?.tech || 'Quiz'}`,
        content: aiSummary,
        category: "AI Generated"
      }, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      alert("AI Summary saved to your Personal Notes!");
    } catch (err) {
      alert("Failed to save notes.");
    }
  };

  return (
   
     <>

        <div className="max-w-4xl mx-auto flex justify-between items-center gap-6 p-2 bg-white border-b sticky top-0 z-50">
          <button onClick={() => navigate(-1)} className="flex items-center gap-0.5 text-gray-500 hover:text-purple-600 font-bold transition-all">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-1">
            <Sparkles className="text-purple-600" size={24} />
            <h1 className="text-xl font-black text-gray-800 tracking-tight text-center">AI SMART GUIDE</h1>
          </div>
          <button 
            disabled={isGenerating || !aiSummary}
            onClick={handleSaveToNotes}
            className="btn active:scale-95 transition-all"
          >
            <Save size={18} /> Save
          </button>
        </div>
     
 <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      <div className="max-w-4xl mx-auto p-4 mt-2 grid md:grid-cols-2 gap-6">
        
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Review wrong Answers</h2>
          {wrongAnsArr.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm">{m.question}</h3>
              <div className="space-y-2">
                <div className="text-xs p-2 bg-red-50 text-red-700 rounded-lg border border-red-100">
                   <span className="font-black">Your Ans:</span> {m.userAns}
                </div>
                <div className="text-xs p-2 bg-green-50 text-green-700 rounded-lg border border-green-100">
                   <span className="font-black">Correct Ans:</span> {m.correctAns}
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="relative">
          <div className="sticky top-24">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">AI Concept Summary</h2>
            <div className="bg-white p-6 rounded-[2rem] border-2 border-purple-100 shadow-xl min-h-[400px]">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
                  <p className="text-gray-500 font-medium animate-pulse">Gemini is analyzing your weak points...</p>
                </div>
              ) : (
                <div className="prose prose-purple">
                  <div className="flex items-center gap-2 text-purple-700 mb-4">
                    <BrainCircuit size={22} />
                    <span className="font-black text-sm uppercase tracking-tighter">AI Learning Insights</span>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                    {aiSummary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>

    </>
  );
};

export default AnalyzeWrongAns;