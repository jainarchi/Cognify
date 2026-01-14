import { useEffect, useState } from "react";
import axios from "axios";
import { Award, Target, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const API_BASE = "http://localhost:4000";

const Profile = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);


  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    const fetchResults = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/api/results`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.success) {
          setResults(res.data.results);
          console.log(results)
        }
      } 
      catch (err) {
        console.error("Failed to fetch results:", err.response?.data || err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token]);



  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading results...
      </div>
    );
  }


  if (!results.length) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <Award size={48} className="mx-auto text-purple-600 mb-3" />
          <h2 className="text-xl font-semibold">No quiz results yet</h2>
          <p className="text-gray-500 mt-1">
            Take a quiz to see your performance here.
          </p>
          <h4 onClick={() => {navigate('/')}} className="text-purple-600 cursor-pointer my-2">Home</h4>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* HEADER SECTION */}
        <div className="bg-white border-b border-purple-100 mb-8">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Award size={40} className="text-purple-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">My Quiz Journey</h1>
            <p className="text-gray-500 font-medium italic">"Consistency is the key to mastery."</p>
            
            {/* STATS SUMMARY BAR */}
            <div className="flex justify-center gap-8 mt-8">
              <div>
                <p className="text-2xl font-bold text-purple-700">{results.length}</p>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Quizzes Done</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  {Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length)}%
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Avg. Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-purple-600" size={20} />
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {results.map((r) => (
              <div
                key={r._id}
                className="group relative bg-white border border-purple-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-300"
              >
               
              <div className="absolute top-0 right-10 w-12 h-1 bg-purple-200 rounded-b-full group-hover:bg-purple-500 transition-colors"></div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-xl capitalize text-gray-800 tracking-tight">
                      {r.technology}
                    </h3>
                    <p className="text-xs font-bold text-purple-500 uppercase tracking-tighter">
                      {r.level} Level
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-green-50 rounded-2xl p-3 text-center border border-green-100">
                    <CheckCircle size={14} className="mx-auto text-green-600 mb-1" />
                    <p className="text-lg font-bold text-green-700 leading-none">{r.correct}</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase">Right</p>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-3 text-center border border-red-100">
                    <XCircle size={14} className="mx-auto text-red-600 mb-1" />
                    <p className="text-lg font-bold text-red-700 leading-none">{r.wrong}</p>
                    <p className="text-[10px] font-bold text-red-600 uppercase">Wrong</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-3 text-center border border-purple-100">
                    <Target size={14} className="mx-auto text-purple-600 mb-1" />
                    <p className="text-lg font-bold text-purple-700 leading-none">{r.score}%</p>
                    <p className="text-[10px] font-bold text-purple-600 uppercase">Score</p>
                  </div>
                </div>

                {/* PERFORMANCE BADGE */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest
                      ${
                        r.performance === "Excellent"
                          ? "bg-green-100 text-green-700"
                          : r.performance === "Good"
                          ? "bg-blue-100 text-blue-700"
                          : r.performance === "Average"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {r.performance}
                  </span>
                  
                  {/* PROGRESS MINI BAR */}
                  <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${r.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
